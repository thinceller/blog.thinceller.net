import Link from 'next/link';
import type { FC } from 'react';

type Props = {
  tags: string[] | null | undefined;
};

export const PostTags: FC<Props> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="inline-block px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};
