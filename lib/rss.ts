import { Feed } from 'feed';
import { BLOG_AUTHOR, BLOG_NAME, BLOG_URL } from './constants';
import { getAllPosts } from './post';

function createFeedInstance(posts: ReturnType<typeof getAllPosts>): Feed {
  const siteURL = BLOG_URL;
  const year = new Date().getFullYear();

  // Validate required data
  if (!siteURL || !BLOG_NAME || !BLOG_AUTHOR) {
    throw new Error('Missing required configuration for feed generation');
  }

  const feed = new Feed({
    title: BLOG_NAME,
    description: `${BLOG_AUTHOR}の技術ブログ`,
    id: siteURL,
    link: siteURL,
    language: 'ja',
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `© ${year} ${BLOG_AUTHOR}`,
    updated: posts[0]?.modifiedTime
      ? new Date(posts[0].modifiedTime)
      : new Date(posts[0]?.publishedTime || new Date()),
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
      atom: `${siteURL}/atom.xml`,
    },
    author: {
      name: BLOG_AUTHOR,
      link: siteURL,
    },
  });

  for (const post of posts) {
    // Validate post data
    if (!post.title || !post.slug || !post.publishedTime) {
      console.warn(`Skipping invalid post: ${JSON.stringify(post)}`);
      continue;
    }

    const url = `${siteURL}/posts/${post.slug}`;
    const date = new Date(post.publishedTime);
    const modifiedDate = post.modifiedTime
      ? new Date(post.modifiedTime)
      : undefined;

    // Add excerpt as content if description is available
    const content = post.description ? `<p>${post.description}</p>` : undefined;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content,
      date: modifiedDate || date,
      published: date,
      author: [
        {
          name: BLOG_AUTHOR,
          link: siteURL,
        },
      ],
    });
  }

  return feed;
}

export function generateRSSFeed(): string {
  const posts = getAllPosts([
    'title',
    'description',
    'slug',
    'publishedTime',
    'modifiedTime',
  ]);

  const feed = createFeedInstance(posts);
  return feed.rss2();
}

export function generateAtomFeed(): string {
  const posts = getAllPosts([
    'title',
    'description',
    'slug',
    'publishedTime',
    'modifiedTime',
  ]);

  const feed = createFeedInstance(posts);
  return feed.atom1();
}
