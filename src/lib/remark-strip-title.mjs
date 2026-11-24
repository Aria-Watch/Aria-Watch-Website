/**
 * Content files start with a `# Title` so they read well on GitHub.
 * On the site the title is rendered by the page layout (from frontmatter),
 * so the first level-1 heading is removed to avoid showing it twice.
 */
export default function remarkStripTitle() {
  return (tree) => {
    const index = tree.children.findIndex(
      (node) => node.type === 'heading' && node.depth === 1,
    );
    if (index !== -1) tree.children.splice(index, 1);
  };
}
