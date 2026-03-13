# Chinese Bank Forex Rates Plan History

This file records the design intent, implementation decisions, source-discovery context, and practical lessons for future development of the `chinese-bank-forex-rates` skill.

## Goal

Build an OpenClaw skill that returns the latest forex rates for supported Chinese banks.

Inputs:

- `bank`: a bank name or alias
- `currencies`: one or more currency names or ISO codes

Output shape:

- `bankName`
- `updateTime`
- `rates[]` with `currencyName`, `buyPrice`, `sellPrice`

## User Requirements Captured During Planning

- Support bank-name aliases.
- Accept one bank and multiple currencies per request.
- Return only the requested currencies.
- Prefer `现汇买入价` as `buyPrice` and `现汇卖出价` as `sellPrice` when a bank publishes both `现汇` and `现钞` columns.
- Fall back to `现钞买入价` and `现钞卖出价` if the preferred `现汇` values are empty.
- Leave the field empty if both preferred and fallback values are unavailable.
- Keep the structure maintainable so more banks can be added without reworking the skill.

## Chosen Architecture

The implementation uses a bank-driver architecture.

Layout:

- `.github/skills/chinese-bank-forex-rates/src/banks/`: one file per bank
- `.github/skills/chinese-bank-forex-rates/src/banks/registry.js`: bank registry and alias resolution
- `.github/skills/chinese-bank-forex-rates/src/lib/`: fetch, parsing, time, price, and text helpers
- `.github/skills/chinese-bank-forex-rates/src/normalization/`: bank and currency normalization
- `.github/skills/chinese-bank-forex-rates/src/models/`: driver and response contracts
- `.github/skills/chinese-bank-forex-rates/test/`: contract tests plus bank-specific fixtures

Why this structure was chosen:

- New banks can be added as isolated drivers.
- Shared normalization and fetch logic stays centralized.
- Bank-specific scraping or API quirks do not leak into the CLI entrypoint.
- Tests can pin bank behavior with small, bank-local fixtures.

## Runtime and Tooling

- Runtime: Node.js
- Dependencies: `cheerio`, `iconv-lite`, `undici`
- Test runner: `node --test`
- CLI entrypoint: `.github/skills/chinese-bank-forex-rates/src/index.js`

## Data-Source Strategy by Bank

The main lesson from implementation was that the visible page is not always the real source of truth. Several banks required direct API or feed access rather than HTML scraping.

### 招商银行

- Public page path: `/hq/`
- Final source: `https://fx.cmbchina.com/api/v1/fx/rate`
- Reason: `/hq/` is a SPA shell and does not contain the rate rows in the HTML response.
- Discovery path: saved shell HTML plus downloaded `cmb-umi.js` bundle exposed the `/api/v1/fx/*` endpoints.

### 中国银行

- Final source: HTML table on the published rate page
- Reason: the required rate table is present in the server response and can be scraped directly.

### 中国农业银行

- Final source: structured JSON endpoint
- Reason: direct API access is more stable than scraping the rendered page.

### 中国工商银行

- Final source: `https://papi.icbc.com.cn/exchanges/ns/getLatest`
- Reason: the public page loads data client-side through ICBC's own API.
- Discovery path: page source plus shared `config.js` revealed `window.appConfig.papi.host` and `/exchanges/ns/*` endpoints.

### 中国建设银行

- Final source: `https://www1.ccb.com/cn/home/news/jshckpj_new2.xml`
- Reason: the display page was not the most reliable extraction surface; the XML feed is direct and structured.

### 交通银行

- Final source: `https://www.bankcomm.com/SITE/queryExchangeResult.do`
- Reason: the top-level page is an iframe shell, while the actual rate content comes from a separate endpoint.

## Fetch Layer Decisions

The shared fetch helper was upgraded beyond a simple HTTP GET wrapper.

Capabilities:

- character-set detection from headers and page metadata
- byte-preserving decoding with `iconv-lite`
- support for non-GET requests, including JSON POST bodies
- Windows PowerShell fallback for sites that fail under Node/OpenSSL due to legacy TLS renegotiation behavior

This matters because some bank endpoints worked only after falling back away from the default Node HTTPS path.

## Price Normalization Rules

Implemented in shared helpers so all banks follow the same interpretation rules.

- `buyPrice`: first non-empty of preferred buy columns
- `sellPrice`: first non-empty of preferred sell columns
- values such as `-` and `--` are normalized to empty
- banks that publish only one pair use that published pair directly

## Currency Normalization Decisions

The skill accepts Chinese names, common aliases, and ISO codes.

Notable handling added during implementation:

- labels that include embedded codes such as `AED/CNY`
- spelling variants such as `丹麦克郎`
- fallback behavior when a source label includes a code in parentheses

## Test Strategy

Tests combine two layers:

- contract test for required driver metadata and method presence
- one bank-specific fixture test per supported bank

Fixture guidance:

- keep fixtures minimal and representative
- prefer structured data when the live source is structured
- name fixtures by what they actually contain

Current examples:

- direct JSON fixtures for 招商银行 and 中国工商银行
- XML fixture for 中国建设银行
- HTML fixtures where the real source is still HTML

## Debug Artifact Policy

Archived reverse-engineering files live under `.github/skills/chinese-bank-forex-rates/debug/`.

Subfolders:

- `live-snapshots/`: captured live page or response bodies
- `source-assets/`: downloaded front-end assets that helped reveal hidden endpoints
- `dumps/`: new ad hoc dumps from `scripts/dump-driver.js`

This keeps the project root clean while preserving useful onboarding context for future bank additions.

## Important Changes Made During Implementation

Chronological summary:

1. Started from an empty workspace and scaffolded the skill project.
2. Created the driver registry, normalization helpers, response model, and CLI entrypoint.
3. Added one file per bank plus fixtures and tests.
4. Fixed early parsing bugs and CLI issues.
5. Added Windows-specific fetch fallback for brittle bank TLS behavior.
6. Switched 建行 from page scraping to an XML feed.
7. Switched 交行 from iframe scraping to the AJAX endpoint.
8. Replaced 招行 HTML parsing with the discovered `/api/v1/fx/rate` JSON endpoint.
9. Replaced 工行 HTML parsing with the discovered `/exchanges/ns/getLatest` API.
10. Cleaned temporary files and moved investigation artifacts into `debug/`.

## Current Supported Banks

- 招商银行
- 中国银行
- 中国农业银行
- 中国工商银行
- 中国建设银行
- 交通银行

## Current State for Future Work

What is already solid:

- the core architecture is extensible
- tests pass for all supported banks
- live extraction works for the six supported banks
- bank-specific source decisions are documented

What future work is likely worthwhile:

- add more banks using the same driver template
- add history-query support for banks whose history endpoints are already known
- rename remaining fixtures only when their stored format actually changes
- keep `debug/` curated so it stays useful rather than becoming a second temp area

## Practical Guidance for the Next Contributor

When adding a bank:

1. Do not assume the visible page contains the rates.
2. Inspect front-end bundles, iframes, config scripts, and network-backed assets early.
3. Prefer a stable direct feed or API over page scraping when one exists.
4. Add a dedicated driver file, fixture, and bank-specific test before wiring the bank into the registry.
5. Archive only the reverse-engineering artifacts that explain how the source was discovered.

When changing an existing bank:

1. Preserve the shared response shape.
2. Keep bank quirks inside the bank driver.
3. Re-run the full test suite after any source or fetch-layer change.
