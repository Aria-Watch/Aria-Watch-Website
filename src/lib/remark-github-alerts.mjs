/**
 * Renders GitHub-style alerts so the same Markdown looks right in both places:
 *
 *   > [!NOTE]
 *   > Useful information.
 *
 * becomes <aside class="callout callout--note"> with a title line.
 */
const TYPES = {
  NOTE: 'Note',
  TIP: 'Tip',
  IMPORTANT: 'Important',
  WARNING: 'Warning',
  CAUTION: 'Caution',
};
const MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\n?/;

function walk(node, visit) {
  visit(node);
  if (node.children) for (const child of node.children) walk(child, visit);
}

export default function remarkGithubAlerts() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'blockquote') return;
      const paragraph = node.children[0];
      const first = paragraph?.type === 'paragraph' ? paragraph.children[0] : null;
      if (!first || first.type !== 'text') return;
      const match = first.value.match(MARKER);
      if (!match) return;

      const type = match[1];
      first.value = first.value.slice(match[0].length);
      if (!first.value) paragraph.children.shift();
      if (paragraph.children.length === 0) node.children.shift();

      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['callout__title'] } },
        children: [{ type: 'text', value: TYPES[type] }],
      });
      node.data = {
        hName: 'aside',
        hProperties: { className: ['callout', `callout--${type.toLowerCase()}`] },
      };
    });
  };
}
