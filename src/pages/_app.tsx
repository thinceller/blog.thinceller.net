import { AppProps } from 'next/app'
import { ZeitProvider, CssBaseline } from '@zeit-ui/react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ZeitProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ZeitProvider>
    </>
  )
}

export default MyApp
