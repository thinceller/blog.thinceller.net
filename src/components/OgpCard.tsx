import Image from 'next/image';
import Link from 'next/link';

type OgpData = {
  title: string;
  description?: string;
  image?: string;
  siteName?: string;
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

    // Get favicon
    const getFavicon = (): string | undefined => {
      const faviconPatterns = [
        /<link\s+rel=["'](?:icon|shortcut icon)["'].*?href=["']([^"']+)["']/i,
        /<link\s+href=["']([^"']+)["'].*?rel=["'](?:icon|shortcut icon)["']/i,
      ];

      for (const pattern of faviconPatterns) {
        const match = html.match(pattern);
        if (match?.[1]) {
          const faviconUrl = match[1];
          // Handle relative URLs
          if (faviconUrl.startsWith('http')) {
            return faviconUrl;
          }
          const urlObj = new URL(url);
          if (faviconUrl.startsWith('/')) {
            return `${urlObj.origin}${faviconUrl}`;
          }
          return `${urlObj.origin}/${faviconUrl}`;
        }
      }

      // Default favicon
      const urlObj = new URL(url);
      return `${urlObj.origin}/favicon.ico`;
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

    const siteName = getMetaContent('og:site_name');

    const favicon = getFavicon();

    return {
      title,
      description,
      image,
      siteName,
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
      <div className="flex flex-col sm:flex-row">
        {ogpData.image && (
          <div className="sm:w-1/3 flex-shrink-0 relative h-48 sm:h-auto bg-gray-100">
            <Image
              src={ogpData.image}
              alt={ogpData.title}
              fill
              className="object-cover"
              unoptimized // External images may require unoptimized mode
            />
          </div>
        )}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {ogpData.title}
            </h3>
            {ogpData.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
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
                className="flex-shrink-0"
                unoptimized
              />
            )}
            <span className="truncate">{ogpData.siteName || domain}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
