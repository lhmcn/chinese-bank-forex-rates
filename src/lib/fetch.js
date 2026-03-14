const axios = require('axios');
const iconv = require('iconv-lite');
const https = require('https');
const crypto = require('crypto');

const DEFAULT_TIMEOUT_MS = 15_000;

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
  try {
    const response = await axios.request({
      url,
      method: options.method || 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        ...(options.headers || {}),
      },
      data: options.body,
      responseType: 'arraybuffer',
      timeout: options.timeoutMs || DEFAULT_TIMEOUT_MS,
      httpsAgent: new https.Agent({
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
      }),
      validateStatus(status) {
        return status >= 200 && status < 300;
      },
    });

    const buffer = Buffer.isBuffer(response.data)
      ? response.data
      : Buffer.from(response.data);
    const charset = detectCharset(response.headers['content-type'], buffer);
    return { buffer, charset };
  } catch (error) {
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

module.exports = {
  fetchBuffer,
  fetchJson,
  fetchText,
};
