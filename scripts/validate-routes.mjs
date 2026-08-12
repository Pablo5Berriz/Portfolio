#!/usr/bin/env node
/**
 * Verifies that the essential routes exist in the production build output.
 * Must run AFTER `astro build` (reads dist/, does not build it).
 */

import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const ESSENTIAL_ROUTES = [
  'fr/index.html',
  'en/index.html',
  'fr/projects/index.html',
  'en/projects/index.html',
  'fr/contact/index.html',
  'en/contact/index.html',
];

if (!existsSync(DIST)) {
  console.error(`validate-routes: dist/ introuvable — exécuter "npm run build" avant ce script`);
  process.exit(1);
}

const missing = ESSENTIAL_ROUTES.filter((route) => !existsSync(join(DIST, route)));

if (missing.length) {
  console.error(`\n${missing.length} route(s) essentielle(s) manquante(s) dans dist/ :`);
  for (const m of missing) console.error(`  - dist/${m}`);
  console.error('');
  process.exit(1);
}

console.log(`validate-routes: OK (${ESSENTIAL_ROUTES.length}/${ESSENTIAL_ROUTES.length} routes essentielles présentes)`);
process.exit(0);
