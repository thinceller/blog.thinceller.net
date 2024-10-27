/* eslint-disable react/display-name */
import { type MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { Tweet, TweetProps } from 'react-twitter-widgets';

export const CustomMDXComponents: MDXComponents = {
  a: (p: JSX.IntrinsicElements['a']) => {
    const { href, ...rest } = p;
    // TODO: Fix internal link
    // const isInternalLink =
    //   href && (href.startsWith('/') || href.startsWith('#'));

    return (
      <Link
        className="text-blue-500 hover:underline"
        href={href ?? '#'}
        {...rest}
      />
    );
  },
  blockquote: (p: JSX.IntrinsicElements['blockquote']) => (
    <blockquote
      className="bg-gray-100 border-l-8 border-l-gray-300 border-solid p-4 mb-6 [&>p]:mb-0"
      {...p}
    />
  ),
  hr: () => <hr className="my-10" aria-orientation="horizontal" />,
  h1: (p: JSX.IntrinsicElements['h1']) => (
    <h1 className="mt-12 mb-4 font-bold text-custom-2xl" {...p} />
  ),
  h2: (p: JSX.IntrinsicElements['h2']) => (
    <h2 className="mt-12 mb-4 font-bold text-custom-xl" {...p} />
  ),
  h3: (p: JSX.IntrinsicElements['h3']) => (
    <h3 className="mt-8 mb-4 font-bold text-custom-lg" {...p} />
  ),
  h4: (p: JSX.IntrinsicElements['h4']) => (
    <h4 className="mb-4 font-bold text-custom-base" {...p} />
  ),
  h5: (p: JSX.IntrinsicElements['h5']) => (
    <h5 className="mb-4 font-bold text-custom-sm" {...p} />
  ),
  h6: (p: JSX.IntrinsicElements['h6']) => (
    <h6 className="mb-4 font-bold text-custom-xs" {...p} />
  ),
  li: (p: JSX.IntrinsicElements['li']) => (
    <li className="text-custom-base" {...p} />
  ),
  ol: (p: JSX.IntrinsicElements['ol']) => <ol className="mb-6 ml-8" {...p} />,
  p: (p: JSX.IntrinsicElements['p']) => (
    <p className="mb-6 text-custom-base" {...p} />
  ),
  ul: (p: JSX.IntrinsicElements['ul']) => (
    <ul className="mb-6 ml-8 list-disc" {...p} />
  ),
  Tweet: (p: TweetProps) => <Tweet {...p} />,
  Image: (p: ImageProps) => {
    let href: string;
    if (typeof p.src === 'string') {
      href = p.src;
    } else if ('src' in p.src) {
      href = p.src.src;
    } else if (p.src.default) {
      href = p.src.default.src;
    } else {
      throw new Error('Can not access to href');
    }
    return (
      <p className="m-6">
        <Link href={href} title={p.alt}>
          <Image {...p} />
        </Link>
      </p>
    );
  },
};
