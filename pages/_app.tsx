import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'nextra-theme-blog/style.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>thinceller</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
