/* eslint-disable @typescript-eslint/no-var-requires */
// Fails if a built page has an inline script whose hash the policy in
// next.config.js does not list. Run it after `next build`.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

const PAGES_DIR = path.join(__dirname, '..', '.next', 'server', 'pages');
const SCRIPT_PATTERN = /<script([^>]*)>([\s\S]*?)<\/script>/g;

const findHtml = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findHtml(entryPath);
    return entry.name.endsWith('.html') ? [entryPath] : [];
  });

const main = async () => {
  const config = require('../next.config.js')(PHASE_PRODUCTION_BUILD);
  const headers = (await config.headers()).flatMap(rule => rule.headers);
  const policy = headers.find(header =>
    header.key.startsWith('Content-Security-Policy')
  ).value;
  const allowed = new Set(policy.match(/'sha256-[^']+'/g) || []);

  const files = findHtml(PAGES_DIR);
  if (files.length === 0) {
    console.error(`No HTML in ${PAGES_DIR}. Run next build first.`);
    process.exit(1);
  }

  let failed = false;
  files.forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    for (const [, attributes, body] of html.matchAll(SCRIPT_PATTERN)) {
      const runs =
        !/\ssrc=/.test(attributes) &&
        !/type="application\/json"/.test(attributes) &&
        body.length > 0;
      if (!runs) continue;
      const hash = `'sha256-${crypto
        .createHash('sha256')
        .update(body)
        .digest('base64')}'`;
      if (!allowed.has(hash)) {
        console.error(
          `${path.relative(PAGES_DIR, file)}: inline script ${hash}`
        );
        failed = true;
      }
    }
  });

  if (failed) {
    console.error('Add these hashes to SCRIPT_HASHES in next.config.js.');
    process.exit(1);
  }
  console.log(`${files.length} pages, no inline script outside the policy`);
};

main();
