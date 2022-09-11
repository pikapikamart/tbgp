import { 
  AdminSchema, 
  VerifyPositionSchema } from "../schemas/admin.schema"
import { 
  createAdmin, 
  getAdmin, 
  updateAdmin } from "../services/admin.service";
import { trpcError } from "../utils/error.util";
import { customAlphabet } from "nanoid";
import { updateStaff } from "../services/staff.service";
import { STAFF_POSITIONS } from "../models/staff.model";
import { apiResult } from "../utils/success.util";
import { AdminContext } from "../middlewares/router.middleware";


export const createAdminHandler = async ( input: AdminSchema ) =>{
  const adminPassword = process.env.ADMIN_PASSWORD as string;
  
  const foundAdmin = await getAdmin();

  if ( foundAdmin ) {
    return trpcError("CONFLICT", "Admin already created")
  }

  if ( adminPassword !== input.password ) {
    return trpcError("BAD_REQUEST", "Admin password incorrect in creation")
  }

  await createAdmin(input);

  return apiResult("Admin created", true);
}

export const createBastionIdHandler = async( { admin }: AdminContext ) =>{

  if ( admin.bastionIds.length===3 ) {
    return trpcError("BAD_REQUEST", "Maximum of 3 bastion id's at a time")
  }

  const nanoid = customAlphabet(process.env.BASTIONID_SECRET as string, 15);
  const createdBastionId = nanoid();

  await updateAdmin({
    $push: {
      bastionIds: createdBastionId
    }
  })

  return apiResult("Successfully created bastion id", createdBastionId);
}

export const verifyPositionHandler = async ( { bastionId, position }: VerifyPositionSchema, ctx: AdminContext ) => {
  const foundRequest = ctx.admin.verifications.find(request => request.bastionId===bastionId)

  if( !foundRequest ){
    return trpcError("BAD_REQUEST", "Send a valid verification request");
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

  return apiResult("Successfully verified a staff", true)
}