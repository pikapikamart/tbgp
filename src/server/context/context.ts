import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getToken } from 'next-auth/jwt';


export async function createContext( ctx: trpcNext.CreateNextContextOptions ){
  const { req, res } = ctx;
  const token = await getToken({ req });
  
  return {
    req,
    res,
    token
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;