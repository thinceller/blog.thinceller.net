import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '';
const hasGaId = GA_ID !== '';

const pageView = (path: string) => {
  if (!hasGaId) {
    return;
  }

  window.gtag('config', GA_ID, {
    page_path: path,
  });
};

type EventParams = {
  action: string;
  category: string;
  label: string;
  value?: string;
};
export const event = ({ action, category, label, value = '' }: EventParams) => {
  if (!hasGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export const GoogleAnalytics = () => {
  const router = useRouter();

  /**
   * if a user change route on client-side, push event to GA
   */
  useEffect(() => {
    if (!hasGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageView(path);
    };

    /**
     * @see https://nextjs.org/docs/api-reference/next/router#routerevents
     */
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {hasGaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          {/** biome-ignore lint/correctness/useUniqueElementIds: Will address later in https://github.com/thinceller/blog.thinceller.net/issues/1082 */}
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
};
