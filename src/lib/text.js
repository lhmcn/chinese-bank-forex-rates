function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeKey(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[()（）\[\],.:：/\-]/g, '')
    .replace(/\s+/g, '');
}

module.exports = {
  cleanText,
  normalizeKey,
};
