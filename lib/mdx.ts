import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { z } from 'zod';

import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';

const frontMatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  publishedTime: z.string(),
  modifiedTime: z.string().optional(),
  tags: z.array(z.string()).nullable(),
});

type frontMatterType = z.infer<typeof frontMatterSchema>;

type MDXPostData = {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: frontMatterType;
};
export const getPostBySlug = async (slug: string): Promise<MDXPostData> => {
  const fileContent = fs.readFileSync(
    join(process.cwd(), '_posts', `${slug}.mdx`),
    'utf8'
  );
  const { data, content } = matter(fileContent);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeCodeTitles, rehypePrism, rehypeSlug],
    },
  });
  const frontMatter = frontMatterSchema.parse(data);

  return {
    mdxSource,
    frontMatter,
  };
};
