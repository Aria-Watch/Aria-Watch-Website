/**
 * Relative links between Markdown files (e.g. `./borino/pcb-assembly.md`)
 * work when browsing the repository on GitHub. This plugin rewrites them to
 * the matching site URL at build time, so authors only ever write one link.
 *
 *   content/docs/<path>.md   -> /docs/<path>/
 *   content/docs/index.md    -> /docs/
 *   content/blog/<file>.md   -> /blog/<slug from frontmatter>/
 *   content/pages/<name>.md  -> /<name>/
 */
import fs from 'node:fs';
import path from 'node:path';

const CONTENT_ROOT = path.resolve('content');

function urlFor(file) {
  const rel = path.relative(CONTENT_ROOT, file).split(path.sep).join('/');
  const [collection, ...rest] = rel.replace(/\.md$/, '').split('/');
  const name = rest.join('/');
  if (collection === 'docs') {
    return name === 'index' ? '/docs/' : `/docs/${name.replace(/\/index$/, '')}/`;
  }
  if (collection === 'pages') return `/${name}/`;
  if (collection === 'blog') {
    const source = fs.readFileSync(file, 'utf8');
    const slug = source.match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1];
    return `/blog/${slug ?? name}/`;
  }
  return null;
}

function walk(node, visit) {
  visit(node);
  if (node.children) for (const child of node.children) walk(child, visit);
}

export default function remarkMdLinks() {
  return (tree, file) => {
    if (!file.path) return;
    walk(tree, (node) => {
      if (node.type !== 'link' || !node.url) return;
      const match = node.url.match(/^(?!\w+:|\/|#)([^#?]+\.md)(#.*)?$/);
      if (!match) return;
      const target = path.resolve(path.dirname(file.path), match[1]);
      const url = urlFor(target);
      if (url) node.url = url + (match[2] ?? '');
    });
  };
}
