import * as trpcNext from "@trpc/server/adapters/next";
import { 
  NextApiHandler, 
  NextApiRequest, 
  NextApiResponse } from "next";
import { createContext } from "src/server/context/context";
import { appRouter } from "src/server/router";
import Cors from "cors"

const cors = Cors()

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

function withCors(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);
    res.setHeader("Access-Control-Allow-Private-Network", "true")

    return await handler(req, res);
  };
}

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
})