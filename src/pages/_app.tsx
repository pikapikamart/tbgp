import { SessionProvider } from "next-auth/react";
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from "src/server/router";
import superJson from "superjson";


const MyApp: AppType = ({ Component, pageProps }) => {

  return (
    <SessionProvider session={ pageProps.session }>
      <Component {...pageProps} />
    </SessionProvider>
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