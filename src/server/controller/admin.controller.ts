import { AdminDocument } from "../models/admin.model";
import { CreateAdminSchema } from "../schema/admin.schema"
import { createAdmin, getAdmin, updateAdmin } from "../services/admin.service";
import { trpcError } from "../utils/error.util";
import { customAlphabet } from "nanoid";


export const createAdminHandler = async ( input: CreateAdminSchema ) =>{
  const adminPassword = process.env.ADMIN_PASSWORD as string;
  
  const foundAdmin = await getAdmin();

  // only one admin
  if ( foundAdmin ) {
    return trpcError("CONFLICT", "Admin already created")
  }

  // should match the env admin password
  if ( adminPassword !== input.password ) {
    return trpcError("BAD_REQUEST", "Admin password incorrect in creation")
  }

  return await createAdmin(input);
}

// todo - add authentication for admin first

export const createBastionIdHandler = async() =>{
  const admin = await getAdmin() as AdminDocument;
  const bastionIds = admin.bastionIds;

  if ( bastionIds.length===3 ) {
    return trpcError("BAD_REQUEST", "Maximum of 3 bastion id's at a time")
  }

  const nanoid = customAlphabet(process.env.BASTIONID_SECRET as string, 15);
  const createdBastionId = nanoid();

  await updateAdmin({
    $push: {
      bastionIds: createdBastionId
    }
  })

  return {
    message: "Successfully created bastion id",
    data: createdBastionId
  }
}
