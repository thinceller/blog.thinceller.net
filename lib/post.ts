import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDir = join(process.cwd(), '_posts');

function getPostSlugs(): string[] {
  return fs.readdirSync(postsDir);
}

/**
 * post から取得できるデータの種別
 * @todo tags の型の解決ができないので一旦無効化している
 */
type Field =
  | 'slug'
  | 'content'
  | 'title'
  | 'description'
  | 'date'
  | 'publishedTime'
  | 'modifiedTime';
// | 'tags';

/**
 * post のデータを取得する
 * 欲しいデータは `fields` で指定することで返り値に含めることができる
 *
 * @param slug - slug of the target post
 * @param fields - Array of keys for the data to be retrieved
 * @returns Object of the post data
 */
export function getPostBySlug<T extends Field>(slug: string, fields: T[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDir, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {} as { [key in T]: string };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts<T extends Field>(
  fields: T[] = [],
): { [key in T | 'publishedTime']: string }[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, [...fields, 'publishedTime']))
    // sort posts by publishedTime in descending order
    .sort((post1, post2) =>
      post1.publishedTime > post2.publishedTime ? -1 : 1,
    );
  return posts;
}
