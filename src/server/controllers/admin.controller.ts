import { 
  AdminSchema, 
  VerifyPositionSchema } from "../schemas/admin.schema"
import { 
  createAdmin, 
  findAdmin, 
  updateAdmin } from "../services/admin.service";
import { trpcError } from "../utils/error.util";
import { customAlphabet } from "nanoid";
import { updateStaff } from "../services/staff.service";
import { STAFF_POSITIONS } from "../models/staff.model";
import { apiResult, apiResultWithData } from "../utils/success.util";
import { AdminContext } from "../middlewares/router.middleware";
import { BaseUserSchema } from "../schemas/base.user.schema";
import { adminValidator } from "./controller.utils";


// --------Queries--------

export const validateAdminHandler = async( { email, password }: BaseUserSchema ) => {
  const admin = adminValidator(await findAdmin({ email }));
  console.log("backend")
  if ( !await admin.comparePassword(password) ) {
    return trpcError("CONFLICT", "Password does not match")
  }

  return apiResult("Successfully validated", true);
}

export const getProfileHandler = async({ admin }: AdminContext) =>{
  
  return apiResultWithData(true,{
    bastionIds: admin.bastionIds,
    verifications: admin.verifications
  })
}

// --------Mutations--------

export const createAdminHandler = async ( input: AdminSchema ) =>{
  const adminPassword = process.env.ADMIN_PASSWORD as string;
  
  const foundAdmin = await findAdmin({});

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

  return apiResultWithData(true, createdBastionId);
}

export const verifyPositionHandler = async ( { bastionId, position }: VerifyPositionSchema, { admin }: AdminContext ) => {
  const foundRequest = admin.verifications.find(request => request.bastionId===bastionId)

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