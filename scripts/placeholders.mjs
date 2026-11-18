// Lists every placeholder still in the source: [[TODO: …]], [[CHECK: …]] and
// data-todo, with file and line. Run with `npm run placeholders`.
//
// It only reports. It always exits with 0, so it can never fail a build.
//
// Links in src/config/site.ts whose `href` is `null` are listed too: they are
// the ones that render as `href="#"` with a `data-todo` attribute.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SCAN = ['src', 'astro.config.mjs', 'public'];
const TEXT = /\.(astro|ts|mjs|js|md|mdx|css|json|html|svg|txt)$/;

const PATTERNS = [
  { kind: 'TODO', test: /\[\[TODO: [^\]]*\]\]/g },
  { kind: 'CHECK', test: /\[\[CHECK: [^\]]*\]\]/g },
  { kind: 'data-todo', test: /data-todo=["'][^"']*["']/g },
];

function files(path) {
  const full = join(ROOT, path);
  let stat;
  try {
    stat = statSync(full);
  } catch {
    return [];
  }
  if (stat.isFile()) return TEXT.test(path) ? [full] : [];
  return readdirSync(full).flatMap((name) => files(join(path, name)));
}

const found = [];
for (const file of SCAN.flatMap(files)) {
  const name = relative(ROOT, file).replaceAll('\\', '/');
  const lines = readFileSync(file, 'utf8').split('\n');
  const isCode = !name.endsWith('.md');
  lines.forEach((line, index) => {
    // Code comments only describe the format (`[[TODO: …]]`); they are not placeholders.
    if (isCode && /^\s*(\*|\/\*|\/\/)/.test(line)) return;
    for (const { kind, test } of PATTERNS) {
      for (const match of line.matchAll(test)) {
        // A template that builds a placeholder from data, not a placeholder itself.
        if (match[0].includes('${')) continue;
        // The format itself, as in a validation message: `[[TODO: …]]`.
        if (/: …\]\]$/.test(match[0])) continue;
        found.push({ kind, at: `${name}:${index + 1}`, text: match[0] });
      }
    }
    // A config link still waiting for its URL (rendered as href="#" data-todo).
    if (name === 'src/config/site.ts' && /\bhref: null\b/.test(line)) {
      const todo = lines
        .slice(index, index + 4)
        .join(' ')
        .match(/todo: '([^']*)'/);
      found.push({
        kind: 'data-todo',
        at: `${name}:${index + 1}`,
        text: `href: null (${todo?.[1] ?? 'link'})`,
      });
    }
  });
}

const counts = { TODO: 0, CHECK: 0, 'data-todo': 0 };
for (const { kind, at, text } of found) {
  counts[kind] += 1;
  console.log(`${kind.padEnd(9)}  ${at}  ${text}`);
}
console.log(
  `\n${found.length} placeholders: ${counts.TODO} TODO, ${counts.CHECK} CHECK, ${counts['data-todo']} data-todo.`,
);
process.exitCode = 0;
