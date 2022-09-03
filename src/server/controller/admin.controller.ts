import { CreateAdminSchema } from "../schema/admin.schema"
import { createAdmin, getAdmin } from "../services/admin.service";
import { trpcError } from "../utils/error.util";


export const createAdminHandler = async ( input: CreateAdminSchema ) =>{
  const adminPassword = process.env.ADMIN_PASSWORD as string;
  
  const foundAdmin = await getAdmin();

  // only one admin
  if ( foundAdmin ) {
    trpcError("CONFLICT", "Admin already created")
  }

  // should match the env admin password
  if ( adminPassword !== input.password ) {
    trpcError("BAD_REQUEST", "Admin password incorrect in creation")
  }

  return await createAdmin(input);
}