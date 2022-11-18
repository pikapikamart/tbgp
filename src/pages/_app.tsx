import { SessionProvider } from "next-auth/react";
import { withTRPC } from '@trpc/next';
import { AppRouter } from "src/server/router";
import superJson from "superjson";
import { ThemeProvider } from "styled-components";
import { Theme } from "@/styled/base";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "@/store/index";
import { DefaultLayout } from "@/components/layout/default";
import { Authguard } from "@/components/layout/authguard";
import { HelmetProvider } from "react-helmet-async";
import "../../public/fonts/style.css"


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: ( page: React.ReactElement ) => React.ReactNode,
  requireAuth?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, ...rest }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (( page ) => DefaultLayout(page))
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <HelmetProvider>
      <Provider store={ store }>  
        <ThemeProvider theme={ Theme }>
          <SessionProvider session={ props.pageProps.session }>
            { Component.requireAuth? 
            (
              <Authguard>
                { getLayout(<Component {...props.pageProps} />) }
              </Authguard>
            ):
            (
              getLayout(<Component {...props.pageProps} />) 
              ) }
          </SessionProvider>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  )
}

const trpc = withTRPC<AppRouter>({
  config({ ctx }) {
    let url: string = ""

    if ( typeof window !=="undefined" ) {
      url = window.location.href.includes("localhost")? 'http://localhost:3000/api/trpc' : 'http://192.168.1.6:3000/api/trpc'
    }

    if ( process.env.NEXT_PUBLIC_VERCEL_URL ) {
      url = `https://tbgpublications.vercel.app/api/trpc`
    }
    
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