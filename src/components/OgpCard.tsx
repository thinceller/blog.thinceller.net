import Image from 'next/image';
import Link from 'next/link';

type OgpData = {
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
};

type Props = {
  url: string;
};

async function fetchOgpData(url: string): Promise<OgpData> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; OGPBot/1.0; +https://thinceller.net)',
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    // Parse OGP meta tags
    const getMetaContent = (property: string): string | undefined => {
      const patterns = [
        new RegExp(
          `<meta\\s+property=["']${property}["']\\s+content=["']([^"']+)["']`,
          'i',
        ),
        new RegExp(
          `<meta\\s+content=["']([^"']+)["']\\s+property=["']${property}["']`,
          'i',
        ),
        new RegExp(
          `<meta\\s+name=["']${property}["']\\s+content=["']([^"']+)["']`,
          'i',
        ),
        new RegExp(
          `<meta\\s+content=["']([^"']+)["']\\s+name=["']${property}["']`,
          'i',
        ),
      ];

      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match?.[1]) {
          return match[1];
        }
      }
      return undefined;
    };

    const title =
      getMetaContent('og:title') ||
      getMetaContent('twitter:title') ||
      html.match(/<title>([^<]+)<\/title>/i)?.[1] ||
      url;

    const description =
      getMetaContent('og:description') ||
      getMetaContent('twitter:description') ||
      getMetaContent('description');

    const image = getMetaContent('og:image') || getMetaContent('twitter:image');

    const urlObj = new URL(url);
    const favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;

    return {
      title,
      description,
      image,
      favicon,
    };
  } catch (error) {
    console.error('Failed to fetch OGP data:', error);
    // Return minimal data on error
    return {
      title: url,
    };
  }
}

export async function OgpCard({ url }: Props) {
  const ogpData = await fetchOgpData(url);
  const urlObj = new URL(url);
  const domain = urlObj.hostname;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-6 bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <div className="flex flex-row h-32">
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {ogpData.title}
            </h3>
            {ogpData.description && (
              <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                {ogpData.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {ogpData.favicon && (
              <Image
                src={ogpData.favicon}
                alt=""
                width={16}
                height={16}
                className="shrink-0"
                unoptimized
              />
            )}
            <span className="truncate">{domain}</span>
          </div>
        </div>
        {ogpData.image && (
          <div className="h-32 w-32 sm:w-auto sm:max-w-80 bg-gray-100">
            <Image
              src={ogpData.image}
              alt={ogpData.title}
              width={244}
              height={128}
              className="object-cover h-full w-full"
              unoptimized // External images may require unoptimized mode
            />
          </div>
        )}
      </div>
    </Link>
  );
}
