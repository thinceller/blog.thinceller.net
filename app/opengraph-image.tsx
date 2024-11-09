/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'thinceller blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const getAvatar = async () => {
  const res = await fetch(
    new URL('../public/images/avatar.jpg', import.meta.url)
  );
  return res.arrayBuffer();
};

/**
 * @see {@link https://github.com/yuru7/NOTONOTO}
 */
const getFontBold = async () => {
  const res = await fetch(
    new URL('../public/fonts/NOTONOTO35HS-Bold.ttf', import.meta.url)
  );
  return res.arrayBuffer();
};

const getFontRegular = async () => {
  const res = await fetch(
    new URL('../public/fonts/NOTONOTO35HS-Regular.ttf', import.meta.url)
  );
  return res.arrayBuffer();
};

export default async function Image() {
  const logoSrc = await getAvatar();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
        {/* @ts-expect-error */}
        <img src={logoSrc} height={140} style={{ borderRadius: '50%' }} />

        <div style={{ fontSize: 32, fontWeight: 400 }}>thinceller blog</div>
      </div>
    ),
    {
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
