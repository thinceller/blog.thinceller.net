import { DateFormatter } from '@/components/DateFormatter';
import Link from 'next/link';

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
    <article className="relative bg-white border border-gray-100 rounded-md p-4 hover:shadow-md transition-shadow">
      <TitleTag className="text-base font-semibold mb-1">
        <Link
          href={`/posts/${slug}`}
          className="text-gray-900 hover:text-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
        >
          {title}
          <span className="absolute inset-0" aria-hidden="true" />
        </Link>
      </TitleTag>
      <DateFormatter date={publishedTime} />
    </article>
  );
}
