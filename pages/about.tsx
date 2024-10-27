import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import { BLOG_NAME } from '../lib/constants';
import AvatarImage from '../public/images/avatar.jpg';

const About: NextPage = () => {
  return (
    <>
      <NextSeo title="About" />
      <Head>
        <title>{`About | ${BLOG_NAME}`}</title>
      </Head>
      <div className="flex flex-col items-stretch space-y-4">
        <h1 className="text-custom-3xl font-bold mt-2">About</h1>
        <div className="flex items-center justify-center">
          <Image
            src={AvatarImage}
            alt="thinceller's avatar"
            width={120}
            height={120}
            className="rounded-[50%]"
          />
        </div>
        <p className="text-custom-base">thinceller / Kohei Kawakami</p>
        <p className="text-custom-base">しがないソフトウェアエンジニアです。</p>
      </div>
    </>
  );
};

export default About;
