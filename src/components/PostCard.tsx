import Link from 'next/link';
import { DateFormatter } from '@/components/DateFormatter';

type Props = {
  slug: string;
  title: string;
  publishedTime: string;
  titleLevel?: 'h2' | 'h3';
};

export function PostCard({
  slug,
  title,
  publishedTime,
  titleLevel = 'h2',
}: Props) {
  const TitleTag = titleLevel;

  return (
    <article className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
      <TitleTag className="text-base font-semibold mb-1">
        <Link
          href={`/blog/${slug}`}
          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
        >
          {title}
          <span className="absolute inset-0" aria-hidden="true" />
        </Link>
      </TitleTag>
      <DateFormatter date={publishedTime} />
    </article>
  );
}
