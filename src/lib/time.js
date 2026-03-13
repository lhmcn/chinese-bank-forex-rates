const { cleanText } = require('./text');

function pad(value) {
  return String(value).padStart(2, '0');
}

function normalizeDatePart(year, month, day) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function extractDateFromText(text) {
  const cleaned = cleanText(text);
  let match = cleaned.match(/(20\d{2})年(\d{1,2})月(\d{1,2})日/);
  if (match) {
    return normalizeDatePart(match[1], match[2], match[3]);
  }

  match = cleaned.match(/(20\d{2})[-\/](\d{1,2})[-\/](\d{1,2})/);
  if (match) {
    return normalizeDatePart(match[1], match[2], match[3]);
  }

  return '';
}

function extractDateTimeFromText(text) {
  const cleaned = cleanText(text);
  const match = cleaned.match(/(20\d{2}[-\/]\d{1,2}[-\/]\d{1,2})\s+(\d{1,2}:\d{2}:\d{2})/);
  if (!match) {
    return '';
  }
  return `${match[1]} ${match[2]}`;
}

function normalizeTimestamp(value, fallbackDate = '') {
  const cleaned = cleanText(value);
  if (!cleaned && !fallbackDate) {
    return '';
  }

  if (/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}:?\d{2}|Z)$/.test(cleaned)) {
    return cleaned;
  }

  let match = cleaned.match(/(20\d{2})年(\d{1,2})月(\d{1,2})日\s*(\d{1,2}:\d{2}:\d{2})/);
  if (match) {
    return `${normalizeDatePart(match[1], match[2], match[3])}T${match[4]}+08:00`;
  }

  match = cleaned.match(/(20\d{2})[-\/](\d{1,2})[-\/](\d{1,2})\s*(\d{1,2}:\d{2}:\d{2})/);
  if (match) {
    return `${normalizeDatePart(match[1], match[2], match[3])}T${match[4]}+08:00`;
  }

  match = cleaned.match(/(20\d{2})(\d{2})(\d{2})\s*(\d{2})(\d{2})(\d{2})/);
  if (match) {
    return `${normalizeDatePart(match[1], match[2], match[3])}T${match[4]}:${match[5]}:${match[6]}+08:00`;
  }

  match = cleaned.match(/^(\d{1,2}:\d{2}:\d{2})$/);
  if (match && fallbackDate) {
    const date = extractDateFromText(fallbackDate) || cleanText(fallbackDate);
    return date ? `${date}T${match[1]}+08:00` : '';
  }

  return '';
}

module.exports = {
  extractDateFromText,
  extractDateTimeFromText,
  normalizeTimestamp,
};
