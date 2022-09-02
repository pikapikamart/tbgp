import { TRPCError } from "@trpc/server"
import { CreateAdminSchema } from "../schema/admin.schema"
import { createAdmin, getAdmin } from "../services/admin.service";



export const createAdminHandler = async ( input: CreateAdminSchema ) =>{
  const adminPassword = process.env.ADMIN_PASSWORD as string;
  
  const foundAdmin = await getAdmin();

  // only one admin
  if ( foundAdmin ) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Admin already created"
    })
  }

  return await createAdmin(input);
}