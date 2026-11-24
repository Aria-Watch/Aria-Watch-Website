import rss from '@astrojs/rss';
import { getPosts } from '../../lib/content.js';
import { SITE } from '../../site.js';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name} Blog`,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
