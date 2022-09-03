import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "src/server/context/context";
import { appRouter } from "src/server/router";


export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
})