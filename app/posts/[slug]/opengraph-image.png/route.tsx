/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { getAllPosts, getPostBySlug } from '@/lib/post';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// export const alt = 'thinceller blog';
// export const size = {
//   width: 1200,
//   height: 630,
// };
// export const contentType = 'image/png';

// opengraph-image.tsxを使うと、Vercelの環境ではgetPostBySlug内でmdxファイルにアクセスできない。
// そのため、Route Handlerを使ってビルド時に必要なOGP画像を作成する。
export const dynamicParams = false;
export function generateStaticParams() {
  const posts = getAllPosts(['slug']);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const getAvatar = async () => {
  const res = await readFile(
    join(process.cwd(), 'public', 'images', 'avatar.jpg')
  );
  return Uint8Array.from(res).buffer;
};

/**
 * @see {@link https://github.com/yuru7/NOTONOTO}
 */
const getFontBold = async () => {
  const res = await readFile(
    join(process.cwd(), 'public', 'fonts', 'NOTONOTO35HS-Bold.ttf')
  );
  return Uint8Array.from(res).buffer;
};

const getFontRegular = async () => {
  const res = await readFile(
    join(process.cwd(), 'public', 'fonts', 'NOTONOTO35HS-Regular.ttf')
  );
  return Uint8Array.from(res).buffer;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title } = getPostBySlug(params.slug, ['title']);
  const logoSrc = await getAvatar();

  return new ImageResponse(
    (
      <div
        style={{
          padding: '80px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 80,
          alignItems: 'center',
          textAlign: 'center',
          color: '#000',
          backgroundColor: '#fff',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.5,
            textAlign: 'left',
          }}
        >
          {title}
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          {/* @ts-expect-error */}
          <img src={logoSrc} height={140} style={{ borderRadius: '50%' }} />

          <div style={{ fontSize: 32, fontWeight: 400 }}>thinceller blog</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'NOTONOTO',
          data: await getFontRegular(),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'NOTONOTO',
          data: await getFontBold(),
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}
