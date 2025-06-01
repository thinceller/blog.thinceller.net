import { generateAtomFeed } from '@/lib/rss';

export async function GET() {
  const feed = generateAtomFeed();

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control':
        'max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
