#!/usr/bin/env node
/**
 * Minimal content-invariant checks for the portfolio's Markdown content
 * collections. No YAML library: the frontmatter used across this project
 * is a small, consistent set of single-line scalar fields, so a targeted
 * line-based extractor is sufficient and avoids adding a dependency.
 *
 * Covers:
 *   1. FR/EN slug parity across caseStudies and legacyProjects
 *   2. No placeholder links (href="#", githubUrl/demoUrl: "#")
 *   3. Every non-null `image:` path exists under public/
 *   4. imagePlaceholder consistency with the image field
 *   5. Every githubUrl is a syntactically valid https://github.com/... URL
 *
 * Exit code 0 = all checks pass. Non-zero = at least one failure, with a
 * human-readable report of every failure (not just the first one).
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');
const PUBLIC = join(ROOT, 'public');

const failures = [];
const warnings = [];

function fail(msg) {
  failures.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

/** Extracts a single scalar frontmatter field's raw string value, or null if absent/explicit null. */
function extractField(content, field) {
  const re = new RegExp(`^${field}:\\s*(.+)$`, 'm');
  const match = content.match(re);
  if (!match) return undefined;
  let value = match[1].trim();
  if (value === 'null') return null;
  // Strip surrounding quotes if present.
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  return value;
}

function readFrontmatter(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  return {
    slug: extractField(content, 'slug'),
    lang: extractField(content, 'lang'),
    githubUrl: extractField(content, 'githubUrl'),
    demoUrl: extractField(content, 'demoUrl'),
    image: extractField(content, 'image'),
    imagePlaceholder: extractField(content, 'imagePlaceholder'),
  };
}

function listMdFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md'));
}

// ---------------------------------------------------------------------------
// TEST 1 — FR/EN slug parity per collection
// ---------------------------------------------------------------------------
const collections = ['caseStudies', 'legacyProjects', 'experiences'];

for (const collection of collections) {
  const frDir = join(SRC, 'content', collection, 'fr');
  const enDir = join(SRC, 'content', collection, 'en');
  const frFiles = new Set(listMdFiles(frDir));
  const enFiles = new Set(listMdFiles(enDir));

  for (const f of frFiles) {
    if (!enFiles.has(f)) fail(`[TEST 1] ${collection}: "${f}" existe en FR mais pas en EN`);
  }
  for (const f of enFiles) {
    if (!frFiles.has(f)) fail(`[TEST 1] ${collection}: "${f}" existe en EN mais pas en FR`);
  }

  // Duplicate slug detection within a language (slug field vs filename, and
  // slug uniqueness across the collection).
  for (const lang of ['fr', 'en']) {
    const dir = join(SRC, 'content', collection, lang);
    const files = listMdFiles(dir);
    const seenSlugs = new Map();
    for (const f of files) {
      const fm = readFrontmatter(join(dir, f));
      const expectedSlug = f.replace(/\.md$/, '');
      if (fm.slug !== expectedSlug) {
        fail(`[TEST 1] ${collection}/${lang}/${f}: slug frontmatter "${fm.slug}" ne correspond pas au nom de fichier "${expectedSlug}"`);
      }
      if (fm.lang !== lang) {
        fail(`[TEST 1] ${collection}/${lang}/${f}: champ lang "${fm.lang}" ne correspond pas au dossier "${lang}"`);
      }
      if (seenSlugs.has(fm.slug)) {
        fail(`[TEST 1] ${collection}/${lang}: slug "${fm.slug}" en double (${seenSlugs.get(fm.slug)} et ${f})`);
      } else {
        seenSlugs.set(fm.slug, f);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// TEST 2 — No placeholder links (href="#", githubUrl/demoUrl: "#")
// ---------------------------------------------------------------------------
function walk(dir, exts, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, out);
    else if (exts.some((ext) => entry.name.endsWith(ext))) out.push(full);
  }
  return out;
}

const astroFiles = walk(SRC, ['.astro']);
for (const file of astroFiles) {
  const content = readFileSync(file, 'utf-8');
  if (/href\s*=\s*["']#["']/.test(content)) {
    fail(`[TEST 2] ${file.replace(ROOT + '/', '')}: contient un href="#" codé en dur`);
  }
}

const allContentFiles = walk(join(SRC, 'content'), ['.md']);
for (const file of allContentFiles) {
  const content = readFileSync(file, 'utf-8');
  for (const field of ['githubUrl', 'demoUrl']) {
    const value = extractField(content, field);
    if (value === '#' || value === '') {
      fail(`[TEST 2] ${file.replace(ROOT + '/', '')}: ${field} est un placeholder invalide ("${value}")`);
    }
  }
}

// ---------------------------------------------------------------------------
// TEST 3 & 4 — Image existence + imagePlaceholder consistency
// ---------------------------------------------------------------------------
for (const collection of ['caseStudies', 'legacyProjects']) {
  for (const lang of ['fr', 'en']) {
    const dir = join(SRC, 'content', collection, lang);
    for (const f of listMdFiles(dir)) {
      const filePath = join(dir, f);
      const fm = readFrontmatter(filePath);
      const relLabel = `${collection}/${lang}/${f}`;

      if (fm.image && fm.image !== null) {
        const assetPath = join(PUBLIC, fm.image.replace(/^\//, ''));
        if (!existsSync(assetPath)) {
          fail(`[TEST 3] ${relLabel}: image "${fm.image}" référencée mais absente de public/`);
        }
      }

      if (collection === 'caseStudies') {
        const isPlaceholder = fm.imagePlaceholder === 'true';
        const hasImage = !!fm.image && fm.image !== null;

        if (!isPlaceholder && !hasImage) {
          fail(`[TEST 4] ${relLabel}: imagePlaceholder: false mais aucune image définie (image: ${fm.image})`);
        }
        if (isPlaceholder && hasImage) {
          warn(`[TEST 4] ${relLabel}: imagePlaceholder: true alors qu'une image est définie ("${fm.image}") — état ambigu à clarifier, pas un échec bloquant`);
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// TEST 5 — GitHub URLs are syntactically valid https://github.com/... links
// ---------------------------------------------------------------------------
for (const collection of ['caseStudies', 'legacyProjects']) {
  for (const lang of ['fr', 'en']) {
    const dir = join(SRC, 'content', collection, lang);
    for (const f of listMdFiles(dir)) {
      const fm = readFrontmatter(join(dir, f));
      const relLabel = `${collection}/${lang}/${f}`;
      if (fm.githubUrl && fm.githubUrl !== null) {
        if (!fm.githubUrl.startsWith('https://github.com/')) {
          fail(`[TEST 5] ${relLabel}: githubUrl "${fm.githubUrl}" ne commence pas par https://github.com/`);
        }
        try {
          // eslint-disable-next-line no-new
          new URL(fm.githubUrl);
        } catch {
          fail(`[TEST 5] ${relLabel}: githubUrl "${fm.githubUrl}" n'est pas une URL syntaxiquement valide`);
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
if (warnings.length) {
  console.warn(`\n${warnings.length} avertissement(s) (non bloquant) :`);
  for (const w of warnings) console.warn(`  - ${w}`);
}

if (failures.length) {
  console.error(`\n${failures.length} échec(s) de validation du contenu :`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('');
  process.exit(1);
}

console.log(`validate-content: OK (0 échec, ${warnings.length} avertissement(s))`);
process.exit(0);
