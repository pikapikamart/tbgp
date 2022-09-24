import { SessionProvider } from "next-auth/react";
import { withTRPC } from '@trpc/next';
import { AppRouter } from "src/server/router";
import superJson from "superjson";
import { ThemeProvider } from "styled-components";
import { Theme } from "@/styled/base";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import { DefaultLayout } from "@/components/layout/default";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: ( page: React.ReactElement ) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (( page ) => DefaultLayout(page))

  return (
    <Provider store={ store }>  
      <ThemeProvider theme={ Theme }>
        <SessionProvider session={ pageProps.session }>
          { getLayout(<Component {...pageProps} />) }
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  )
}

const trpc = withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      transformer: superJson,
      headers: {
        "x-ssr": "1"
      }
    }
  },
  ssr: true
})(MyApp)


export default trpc;