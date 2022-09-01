import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "src/server/context";
import { appRouter } from "src/server/routers";


export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
})