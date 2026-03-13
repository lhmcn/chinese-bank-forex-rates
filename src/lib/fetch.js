const { execFile } = require('node:child_process');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { promisify } = require('node:util');

const iconv = require('iconv-lite');
const { fetch } = require('undici');

const execFileAsync = promisify(execFile);

const DEFAULT_HEADERS = {
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
};

function detectCharset(contentType, buffer) {
  const header = String(contentType || '').toLowerCase();
  const match = header.match(/charset=([^;]+)/);
  if (match) {
    return normalizeCharset(match[1]);
  }

  const ascii = buffer.toString('ascii', 0, Math.min(buffer.length, 4096));
  const metaMatch = ascii.match(/charset=([^\s"'>]+)/i);
  return normalizeCharset(metaMatch ? metaMatch[1] : 'utf-8');
}

function normalizeCharset(value) {
  const lowered = String(value || '').trim().toLowerCase();
  if (lowered === 'gb2312') {
    return 'gbk';
  }
  return lowered || 'utf-8';
}

async function fetchBuffer(url, options = {}) {
  if (options.preferPowerShell && process.platform === 'win32') {
    return fetchBufferWithPowerShell(url, options);
  }

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        ...(options.headers || {}),
      },
      body: options.body,
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status} for ${url}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const charset = detectCharset(response.headers.get('content-type'), buffer);
    return { buffer, charset };
  } catch (error) {
    const message = String(error && error.message ? error.message : error);
    if (process.platform === 'win32' && (options.allowPowerShellFallback !== false)) {
      if (message.includes('fetch failed') || message.includes('legacy renegotiation')) {
        return fetchBufferWithPowerShell(url, options);
      }
    }
    throw error;
  }
}

async function fetchText(url, options) {
  const { buffer, charset } = await fetchBuffer(url, options);
  return iconv.decode(buffer, charset);
}

async function fetchJson(url, options) {
  const text = await fetchText(url, options);
  return JSON.parse(text);
}

async function fetchBufferWithPowerShell(url, options = {}) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bank-forex-'));
  const tempFile = path.join(tempDir, 'response.bin');
  const headers = {
    ...DEFAULT_HEADERS,
    ...(options.headers || {}),
  };
  const headerLines = Object.entries(headers).map(
    ([key, value]) => `$headers['${escapeForSingleQuotedPowerShell(key)}'] = '${escapeForSingleQuotedPowerShell(value)}'`,
  );
  const commandParts = [
    "$ProgressPreference='SilentlyContinue'",
    "$ConfirmPreference='None'",
    '$headers = @{}',
    ...headerLines,
  ];

  if (options.body != null) {
    commandParts.push(`$body = '${escapeForSingleQuotedPowerShell(String(options.body))}'`);
  }

  let request = "Invoke-WebRequest -UseBasicParsing";
  request += " -Method '" + escapeForSingleQuotedPowerShell(options.method || 'GET') + "'";
  request += " -Uri '" + escapeForSingleQuotedPowerShell(url) + "'";
  request += ' -Headers $headers';
  if (options.contentType) {
    request += " -ContentType '" + escapeForSingleQuotedPowerShell(options.contentType) + "'";
  }
  if (options.body != null) {
    request += ' -Body $body';
  }
  request += " -OutFile '" + escapeForSingleQuotedPowerShell(tempFile) + "'";
  commandParts.push(request);

  const command = commandParts.join('; ');

  try {
    await execFileAsync('powershell.exe', ['-NoProfile', '-Command', command], {
      encoding: 'buffer',
      maxBuffer: 20 * 1024 * 1024,
    });

    const buffer = await fs.readFile(tempFile);
    return {
      buffer,
      charset: detectCharset('', buffer),
    };
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function escapeForSingleQuotedPowerShell(value) {
  return String(value).replace(/'/g, "''");
}

module.exports = {
  fetchBuffer,
  fetchJson,
  fetchText,
};
