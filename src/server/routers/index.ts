import { createRouter } from "@/api-lib/createRouter";
import { postRouter } from "./post";
import superjson from "superjson";


export const appRouter = 
    createRouter()
    .transformer(superjson)
    .query("healthz", {
        async resolve() {
            return "yay!";
        }
    })
    .query("wet", {
        async resolve() {
            return "wet"
        }
    })
    .merge("post.", postRouter);


export type AppRouter = typeof appRouter;