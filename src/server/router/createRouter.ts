import * as trpc from "@trpc/server";
import { Context } from "../context/context";


export const createRouter = () => trpc.router<Context>();
