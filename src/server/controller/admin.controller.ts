import { AdminDocument } from "../models/admin.model";
import { AdminSchema, PositionSchema } from "../schema/admin.schema"
import { createAdmin, getAdmin, updateAdmin } from "../services/admin.service";
import { trpcError } from "../utils/error.util";
import { customAlphabet } from "nanoid";
import { updateStaff } from "../services/staff.service";
import { STAFF_POSITIONS } from "../models/staff.model";


export const createAdminHandler = async ( input: AdminSchema ) =>{
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

export const verifyPositionHandler = async ( { bastionId, position }: PositionSchema ) => {
  const admin = await getAdmin();
  const foundRequest = admin?.verifications.find(request => request.bastionId===bastionId)

  if( !foundRequest ){
    return trpcError("NOT_FOUND", "No request to confirm");
  }

  if ( !STAFF_POSITIONS[position] ) {
    return trpcError("BAD_REQUEST", "Send a valid position");
  }

  await updateStaff(
    { bastionId },
    { position: STAFF_POSITIONS[position] }
  )
  await updateAdmin({
    $pull: {
      verifications: { bastionId }
    }
  })

  return {
    message: "Successfully verified staff",
    success: true
  }
}