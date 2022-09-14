import { Context } from "../context/context";
import { MiddlewareResult } from "@trpc/server/src/internals/middlewares";
import { findStaff } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { StaffDocument } from "../models/staff.model";
import { getCurrentAdmin } from "../controllers/controller.utils";
import { AdminDocument } from "../models/admin.model";


type TrpcNext = {
  (): Promise<MiddlewareResult<Context>>,
  <T>(opts: { ctx: T }): Promise<MiddlewareResult<T>>
};

export const isValidStaff = async( ctx: Context, next: TrpcNext ) =>{
  const foundStaff = await findStaff({ email: ctx.token?.email }, {}, { lean: false });

  if ( !foundStaff ) {
    return trpcError("UNAUTHORIZED", "Please login properly")
  }

  return next({
    ctx: {
      ...ctx,
      staff: foundStaff
    }
  })
}

export const isValidAdmin = async( ctx: Context, next: TrpcNext ) => {
  const admin = await getCurrentAdmin();
  // change to using token validation
  if ( !admin ) {
    return trpcError("UNAUTHORIZED", "Please login as admin properly")
  }

  return next({
    ctx: {
      ...ctx,
      admin
    }
  })
}

export type StaffContext = Context & {
  staff: StaffDocument
}

export type AdminContext = Context & {
  admin: AdminDocument
}