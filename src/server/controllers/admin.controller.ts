import { 
  AdminSchema, 
  EditStaffPositionSchema, 
  VerifyStaffSchema } from "../schemas/admin.schema"
import { 
  createAdminService, 
  findAdminService, 
  updateAdminService } from "../services/admin.service";
import { trpcError } from "../utils/error.util";
import { customAlphabet } from "nanoid";
import { 
  updateStaffService,
  findManyStaffsService } from "../services/staff.service";
import { Staff } from "../models/staff.model";
import { 
  apiResult, 
  trpcSuccess } from "../utils/success.util";
import { AdminContext } from "../middlewares/router.middleware";
import { BaseUserSchema } from "../schemas/base.user.schema";
import { adminValidator } from "./controller.utils";
import { UpdateQuery } from "mongoose";


// --------Queries--------

export const validateAdminHandler = async( { email, password }: BaseUserSchema ) => {
  const admin = adminValidator(await findAdminService({ email }));

  if ( !await admin.comparePassword(password) ) {
    return trpcError("CONFLICT", "Password does not match")
  }

  return apiResult("Successfully validated", true);
}

export const getProfileHandler = async({ admin }: AdminContext) =>{
  
  return trpcSuccess(true,{
    bastionIds: admin.bastionIds,
    verifications: admin.verifications
  })
}

export const getStaffsProfileHandler = async() => {
  const staffsProfile = await findManyStaffsService(
    { position: {
      $ne: null
    } },
    "firstname lastname username bastionId position"
  ) 

  return trpcSuccess(true, staffsProfile)
}

// --------Mutations--------

export const createAdminHandler = async ( input: AdminSchema ) =>{
  const adminPassword = process.env.ADMIN_PASSWORD as string;
  
  const foundAdmin = await findAdminService({});

  if ( foundAdmin ) {
    return trpcError("CONFLICT", "Admin already created")
  }

  if ( adminPassword !== input.password ) {
    return trpcError("BAD_REQUEST", "Admin password incorrect in creation")
  }

  await createAdminService(input);

  return apiResult("Admin created", true);
}

export const createBastionIdHandler = async( { admin }: AdminContext ) =>{

  if ( admin.bastionIds.length===3 ) {
    return trpcError("BAD_REQUEST", "Maximum of 3 bastion id's at a time")
  }

  const nanoid = customAlphabet(process.env.BASTIONID_SECRET as string, 15);
  const createdBastionId = nanoid();

  await updateAdminService({
    $push: {
      bastionIds: createdBastionId
    }
  })

  return trpcSuccess(true, createdBastionId);
}

export const verifyPositionHandler = async ( verification: VerifyStaffSchema, { admin }: AdminContext ) => {
  const foundRequest = admin.verifications.find(request => request.bastionId===verification.bastionId)
 
  if( !foundRequest ){
    return trpcError("NOT_FOUND", "No staff request found");
  }

  let updateStaffBody: UpdateQuery<Staff> = {}

  if ( verification.accepted ) {
    updateStaffBody = {
      position: {
        name: foundRequest.position.name,
        role: foundRequest.position.role,
      },
      storyRequests: {
        requested: [],
        joined: [],
        created: []
      },
      writeups: {
        solo: [],
        collaborated: [],
        task: []
      },
      articles: []
    }
  } else {
    updateStaffBody["verification"] = false
  }
 
  await updateStaffService(
    { bastionId: verification.bastionId },
    updateStaffBody 
  )

  await updateAdminService({
    $pull: {
      verifications: { bastionId: foundRequest.bastionId }
    }
  })

  return apiResult("Successfully verified a staff", true)
}

export const editStaffPositionHandler = async( input: EditStaffPositionSchema ) => {
  const updatedStaff = await updateStaffService(
    { bastionId: input.bastionId },
    {
      position: {
        name: input.name,
        role: input.role
      }
    }
  )

  if ( !updatedStaff ) {
    return trpcError("NOT_FOUND", "No staff with this bastion id`")
  }

  return trpcSuccess(true, "Succesfully changed staff's position`")
}