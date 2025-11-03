import type { Metadata } from 'next';
import Image from 'next/image';
import AvatarImage from '../../../public/images/avatar.jpg';

export const metadata: Metadata = {
  title: 'About',
};

export default function Page() {
  return (
    <div className="flex flex-col items-stretch space-y-4">
      <h1 className="text-custom-3xl font-bold mt-2">About</h1>
      <div className="flex items-center justify-center">
        <Image
          src={AvatarImage}
          alt="thinceller's avatar"
          width={120}
          height={120}
          className="rounded-[50%]"
          loading="eager"
        />
      </div>
      <p className="text-custom-base">thinceller / Kohei Kawakami</p>
      <p className="text-custom-base">しがないソフトウェアエンジニアです。</p>
    </div>
  );
}
