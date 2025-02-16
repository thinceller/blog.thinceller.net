'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/**
 * @see https://blog.kimizuka.org/entry/2021/06/04/111801
 */
declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    twttr: any;
  }
}

export const PostFooter: React.FC = () => {
  useEffect(() => {
    window?.twttr?.widgets?.load();
  }, []);

  return (
    <div className="flex flex-row items-center gap-2">
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-show-count="false"
        data-lang="en"
      >
        Tweet
      </a>
      <a
        href="https://b.hatena.ne.jp/entry/"
        className="hatena-bookmark-button"
        data-hatena-bookmark-layout="basic-label-counter"
        data-hatena-bookmark-lang="ja"
        title="このエントリーをはてなブックマークに追加"
      >
        {/* biome-ignore lint/nursery/noImgElement: <explanation> */}
        <img
          src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
          alt="このエントリーをはてなブックマークに追加"
          width="20"
          height="20"
          style={{ border: 'none' }}
        />
      </a>
      <Script src="https://platform.twitter.com/widgets.js" />
      <Script src="https://b.st-hatena.com/js/bookmark_button.js" />
    </div>
  );
};
