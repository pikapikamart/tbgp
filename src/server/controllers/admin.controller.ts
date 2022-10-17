import { 
  AdminSchema, 
  VerifyStaffSchema } from "../schemas/admin.schema"
import { 
  createAdmin, 
  findAdmin, 
  updateAdmin } from "../services/admin.service";
import { trpcError } from "../utils/error.util";
import { customAlphabet } from "nanoid";
import { updateStaff } from "../services/staff.service";
import { Staff } from "../models/staff.model";
import { 
  apiResult, 
  apiResultWithData } from "../utils/success.util";
import { AdminContext } from "../middlewares/router.middleware";
import { BaseUserSchema } from "../schemas/base.user.schema";
import { adminValidator } from "./controller.utils";
import { UpdateQuery } from "mongoose";


// --------Queries--------

export const validateAdminHandler = async( { email, password }: BaseUserSchema ) => {
  const admin = adminValidator(await findAdmin({ email }));

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

export const verifyPositionHandler = async ( 
  verification: VerifyStaffSchema,
  { admin }: AdminContext 
) => {
  const foundRequest = admin.verifications.find(request => request.bastionId===verification.bastionId)
 
  if( !foundRequest ){
    return trpcError("NOT_FOUND", "No staff request found");
  }

  const updateStaffBody: UpdateQuery<Staff> = {}

  if ( verification.accepted ) {
    updateStaffBody.position = {
      name: foundRequest.position.name,
      role: foundRequest.position.role,
    }
  } else {
    updateStaffBody["verification"] = false
  }

  await updateStaff(
    { bastionId: verification.bastionId },
    updateStaffBody 
  )

  await updateAdmin({
    $pull: {
      verifications: { bastionId: foundRequest.bastionId }
    }
  })

  return apiResult("Successfully verified a staff", true)
}