module.exports = {
  id: 'example-bank',
  displayName: '示例银行',
  aliases: ['示例'],
  sourceUrl: 'https://example.com/forex',
  sourceType: 'html',
  capabilities: {
    supportsPreferredCashSplit: false,
    updateTimeMode: 'page',
  },
  async fetch() {
    throw new Error('Not implemented');
  },
  parse(raw) {
    return raw;
  },
  mapRates(parsed) {
    return {
      updateTime: '',
      rates: [],
    };
  },
};
