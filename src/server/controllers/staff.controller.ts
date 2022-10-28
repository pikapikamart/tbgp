import { 
  StaffContext, 
  VerifiedStaffContext } from "../middlewares/router.middleware";
import { rolesAndPosition } from "../models/staff.model";
import { Writeup } from "../models/writeup.model";
import { BaseUserSchema } from "../schemas/base.user.schema";
import { 
  StaffSchema, 
  BastionIdSchema, 
  UpdateStaffSchema,
  UsernameSchema,
  PositionSchema} from "../schemas/staff.schema";
import { WritingsTabSchema } from "../schemas/writeup.schema";
import { updateAdminService } from "../services/admin.service";
import { 
  createStaffService, 
  findManyStaffsService, 
  findStaffService, 
  staffPopulatorService, 
  updateStaffService } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { 
  apiResult, 
  trpcSuccess } from "../utils/success.util";
import { 
  checkBastionIdExistence, 
  getCurrentAdmin, 
  staffValidator} from "./controller.utils";


// --------Queries--------

export const validateBastionIdHandler = async( bastionId: BastionIdSchema ) => {
  await checkBastionIdExistence(bastionId)

  return apiResult("Bastion Id validated", true)
}

export const validateStaffHandler = async( { email, password }: BaseUserSchema ) => {
  const foundStaff = await findStaffService({ email }, {}, { lean: false })

  if ( !foundStaff ) {
    return trpcError("NOT_FOUND", "No user found with email")
  }

  if ( !await foundStaff.comparePassword(password) ) {
    return trpcError("CONFLICT", "Password does not match")
  }

  return apiResult("Successfully validated", true)
}

export const getStaffHandler = async( username: UsernameSchema, { staff: staffCtx }: StaffContext ) => {
  const staff = staffValidator(await findStaffService(
    { username },
    "-_id firstname lastname bastionId bio position"
  ))
    // add the writings since this will be used when visiting a writer

  return trpcSuccess(true, staff)
}

export const getProfileHandler = async( { staff }: StaffContext ) =>{
  const populatedStaff = staffValidator(await findStaffService(
    { email: staff.email },
    "-_id -__v -password",
    {},
    {
      path: "storyRequests.requested storyRequests.joined",
      select: "-_id storyRequestId"
    }
  ))

  await staffPopulatorService(
    populatedStaff,
    {
      path: "storyRequests.created",
      select: "-_id -__v -owner -assignedMembers -writeupId",
      populate: {
        path: "requests members",
        select: "-_id username"
      }
    }
  )
  
  await staffPopulatorService(
    populatedStaff,
    {
      path: "writeups.solo writeups.collaborated",
      select: "-_id writeupId category content.title content.caption content.phase content.isSubmitted content.isAccepted content.reSubmit content.requestResubmit handledBy",
      transform: ( doc: Writeup ) =>{
        
        return {
          writeupId: doc.writeupId,
          category: doc.category,
          content: doc.content[0]
        }
      }
    }
  )

  await staffPopulatorService(
    populatedStaff,
    {
      path: "writeups.task",
      select: "-_id writeupId category content.title content.caption content.phase content.isSubmitted content.isAccepted content.reSubmit content.requestResubmit content.handledBy ",
      transform: ( doc: Writeup ) =>{

        return {
          writeupId: doc.writeupId,
          category: doc.category,
          content: doc.content.slice().reverse().find(phase => phase?.handledBy?.equals(staff._id))
        }
      }
    }
  )

  return trpcSuccess(true, populatedStaff)
}

export const getWritingsHandler = async( tab: WritingsTabSchema, { staff }: VerifiedStaffContext ) => {
  
  if ( tab==="tasks" && staff.position?.role==="writer" ) {
    return trpcError("FORBIDDEN", "Only editor is allowed")
  }

  await staffPopulatorService(
    staff,
    {
      path: `writeups.${ tab }`,
      select: "-_id category content isPublished writeupId",
      options: {
        lean: true,
      },
      transform: ( doc, id ) =>{
        const {
          phase,
          data,
          notes,
          _id,
          ...rest
        } = doc.content[0]
        doc.content = rest

        return doc
      }
    }
  )

  return trpcSuccess(true, staff.writeups[tab]);
}

// ----Verified Editor ----

export const getWritersNamesHandler = async( { staff }: VerifiedStaffContext ) =>{
  const writers = await findManyStaffsService(
    { 
      position: { $ne: null },
      "_id": {
        $ne: staff._id
      }
     },
    "-_id bastionId firstname lastname"
  )

  return trpcSuccess(true, writers)
}

// --------Mutations--------

export const registerStaffHandler = async( staffBody: StaffSchema ) => {
  await checkBastionIdExistence(staffBody.bastionId);

  const foundStaff = await findStaffService({ email: staffBody.email });

  if ( foundStaff ) {
    return trpcError("CONFLICT", "Email is already in use")
  }

  await createStaffService(
    {
      ...staffBody,
      username: staffBody.email.split("@")[0],
      verification: false,
      position: null,
      bio: "",
      storyRequests: null,
      writeups: null
    }
  )
  await updateAdminService({
    $pull: {
      bastionIds: staffBody.bastionId
    }
  })

  return trpcSuccess(true, staffBody)
}

export const requestStaffPositionHandler = async( position: PositionSchema, { staff }: StaffContext ) => {
  const admin = await getCurrentAdmin();

  if ( !Object.keys(rolesAndPosition).includes(position.role) ) {
    return trpcError("BAD_REQUEST", "Send a valid position role")
  }

  if ( !rolesAndPosition[position.role].includes(position.name) ) {
    return trpcError("BAD_REQUEST", "Send a valid position name")
  }
  
  if ( staff.verification && staff.position ) {
    return trpcError("CONFLICT", "Already a verified staff");
  }

  const foundVerificationRequest = admin.verifications.find(request => request.bastionId===staff.bastionId);

  if ( foundVerificationRequest ) {
    return trpcError("CONFLICT", "Already sent a verification request")
  }

  await updateAdminService({
    $push: {
      verifications: {
        fullname: staff.firstname + " " + staff.lastname,
        bastionId: staff.bastionId,
        position
      }
    }
  })
 
  await updateStaffService(
    { bastionId: staff.bastionId },
    { "verification": true }
  )

  return apiResult("Verification for position request sent", true);
}

export const updateStaffHandler = async( update: UpdateStaffSchema, { staff }: StaffContext ) => {
  await updateStaffService(
    { email: staff.email },
    update
  )

  return apiResult("Successfully udpated profile", true);
}