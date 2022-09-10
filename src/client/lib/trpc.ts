import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "src/server/router";


export const trpc = createReactQueryHooks<AppRouter>();