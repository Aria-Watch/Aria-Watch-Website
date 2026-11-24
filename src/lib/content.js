import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Docs sorted for the sidebar: ungrouped first, then by section, then order. */
export async function getDocs() {
  const docs = await getCollection('docs');
  return docs.sort(
    (a, b) =>
      (a.data.section ?? '').localeCompare(b.data.section ?? '') ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

export const docHref = (doc) => (doc.id === 'index' ? '/docs/' : `/docs/${doc.id}/`);

export function formatDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function readingTime(markdown = '') {
  const words = markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
