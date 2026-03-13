const cheerio = require('cheerio');

const { cleanText, normalizeKey } = require('./text');

function loadHtml(html) {
  return cheerio.load(html);
}

function loadXml(xml) {
  return cheerio.load(xml, { xmlMode: true });
}

function getTableHeaders($, table) {
  return $(table)
    .find('tr')
    .first()
    .find('th,td')
    .toArray()
    .map((cell) => cleanText($(cell).text()));
}

function findTableByHeaders($, expectedHeaders) {
  const normalizedExpected = expectedHeaders.map(normalizeKey);
  return $('table').toArray().find((table) => {
    const headers = getTableHeaders($, table).map(normalizeKey);
    return normalizedExpected.every((header) => headers.includes(header));
  }) || null;
}

function tableRowsAsArrays($, table) {
  return $(table)
    .find('tr')
    .toArray()
    .slice(1)
    .map((row) => $(row)
      .find('td')
      .toArray()
      .map((cell) => cleanText($(cell).text())));
}

module.exports = {
  findTableByHeaders,
  getTableHeaders,
  loadHtml,
  loadXml,
  tableRowsAsArrays,
};
