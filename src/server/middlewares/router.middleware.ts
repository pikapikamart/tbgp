import { Context } from "../context/context";
import { MiddlewareResult } from "@trpc/server/src/internals/middlewares";
import { findStaff } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { StaffDocument } from "../models/staff.model";
import { AdminDocument } from "../models/admin.model";
import { findAdminService } from "../services/admin.service";


type TrpcNext = {
  (): Promise<MiddlewareResult<Context>>,
  <T>(opts: { ctx: T }): Promise<MiddlewareResult<T>>
};

// --------Staff--------

export const isValidStaff = async( ctx: Context, next: TrpcNext ) =>{
  
  if ( ctx.token?.userType!=="staff" ) {
    return trpcError("FORBIDDEN", "Only staff account can proceed")
  }

  const foundStaff = await findStaff({ email: ctx.token?.email }, {}, { lean: false });

  if ( !foundStaff ) {
    return trpcError("UNAUTHORIZED", "Please login as staff properly")
  }

  return next({
    ctx: {
      ...ctx,
      staff: foundStaff
    }
  })
}

export const isVerifiedStaff = async( ctx: StaffContext, next: TrpcNext ) => {
  if ( !ctx.staff.position ) {
    return trpcError("FORBIDDEN", "Make sure to be verified first");
  }
  
  return next({ ctx })
}

// --------Admin--------

export const isValidAdmin = async( ctx: Context, next: TrpcNext ) => {
  
  if ( ctx.token?.userType!=="admin" ) {
    return trpcError("FORBIDDEN", "Only admin account can proceed")
  }

  const admin = await findAdminService({ email: ctx.token?.email });
 
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