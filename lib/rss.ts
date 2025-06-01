import { Feed } from 'feed';
import { BLOG_AUTHOR, BLOG_NAME, BLOG_URL } from './constants';
import { getAllPosts } from './post';

export function generateRSSFeed(): string {
  const posts = getAllPosts([
    'title',
    'description',
    'slug',
    'publishedTime',
    'modifiedTime',
  ]);

  const siteURL = BLOG_URL;
  const feedURL = `${siteURL}/rss.xml`;
  const year = new Date().getFullYear();

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
      rss2: feedURL,
      atom: `${siteURL}/atom.xml`,
    },
    author: {
      name: BLOG_AUTHOR,
      link: siteURL,
    },
  });

  for (const post of posts) {
    const url = `${siteURL}/posts/${post.slug}`;
    const date = new Date(post.publishedTime);
    const modifiedDate = post.modifiedTime
      ? new Date(post.modifiedTime)
      : undefined;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
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

  const siteURL = BLOG_URL;
  const year = new Date().getFullYear();

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
    const url = `${siteURL}/posts/${post.slug}`;
    const date = new Date(post.publishedTime);
    const modifiedDate = post.modifiedTime
      ? new Date(post.modifiedTime)
      : undefined;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
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

  return feed.atom1();
}
