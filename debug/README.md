# Debug Artifacts

This folder keeps reverse-engineering artifacts that were useful during bank onboarding and live-source discovery.

## live-snapshots

- `bankcomm.live.html`: saved live response from 交通银行 during iframe and AJAX source analysis.
- `ccb.live.html`: saved live page/feed content from 中国建设银行 during XML source migration.
- `cmbchina.live.html`: saved live SPA shell from 招商银行 showing that `/hq/` itself did not contain the rate data.
- `icbc.live.html`: saved live 中国工商银行 page source used to discover the `/exchanges/ns/*` API endpoints.

## source-assets

- `cmb-umi.js`: downloaded 招商银行 SPA bundle used to locate `/api/v1/fx/*` endpoints and route structure.
- `forex_price.js`: downloaded front-end asset from 中国建设银行 used while tracing how the site assembled forex data.

## dumps

- `scripts/dump-driver.js` now writes new ad hoc driver dumps to `debug/dumps/` by default.
- This directory is ignored by `.gitignore` because it is intended for temporary troubleshooting output.

Keep only artifacts that explain a bank-specific source decision or are likely to help with future bank onboarding. Remove stale files once they stop being useful.