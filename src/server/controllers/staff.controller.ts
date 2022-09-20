import { StaffContext } from "../middlewares/router.middleware";
import { STAFF_POSITIONS } from "../models/staff.model";
import { BaseUserSchema } from "../schemas/base.user.schema";
import { 
  StaffSchema, 
  BastionIdSchema, 
  PositionSchema,
  UpdateStaffaSchema} from "../schemas/staff.schema";
import { updateAdmin } from "../services/admin.service";
import { 
  createStaff, 
  findStaff, 
  updateStaff } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { 
  apiResult, 
  apiResultWithData } from "../utils/success.util";
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
  const foundStaff = await findStaff({ email }, {}, { lean: false })

  if ( !foundStaff ) {
    return trpcError("NOT_FOUND", "No user found with email")
  }

  if ( !await foundStaff.comparePassword(password) ) {
    return trpcError("CONFLICT", "Password does not match")
  }

  return apiResult("Successfully validated", true)
}

export const getStaffHandler = async( bastionId: BastionIdSchema, { staff: staffctx }: StaffContext ) => {
  // either return the current staff or another staff
  const staff = staffValidator(await findStaff(
    { bastionId: bastionId? bastionId : staffctx.bastionId },
    "-_id firstname lastname bastionId position bio"
  ))

  return apiResultWithData(true, staff)
}

// --------Mutations--------

export const registerStaffHandler = async( staffBody: StaffSchema ) => {
  await checkBastionIdExistence(staffBody.bastionId);

  const foundStaff = await findStaff({ email: staffBody.email });

  if ( foundStaff ) {
    return trpcError("CONFLICT", "Email is already in use")
  }

  await createStaff(
    {
      ...staffBody,
      requests: {
        verification: false,
        story: []
      },
      bio: ""
    }
  )
  await updateAdmin({
    $pull: {
      bastionIds: staffBody.bastionId
    }
  })

  return apiResult("Staff account created", true)
}

// requires authentication
export const requestPositionHandler = async( { position }: PositionSchema, { staff }: StaffContext ) => {
  const admin = await getCurrentAdmin();

  if ( !STAFF_POSITIONS[position] ) {
    return trpcError("BAD_REQUEST", "Send a valid position")
  }

  if ( staff.position ) {
    return trpcError("CONFLICT", "Already a verified staff");
  }

  const foundVerificationRequest = admin.verifications.find(request => request.bastionId===staff.bastionId);

  if ( foundVerificationRequest ) {
    return trpcError("CONFLICT", "Already sent a verification request")
  }

  await updateAdmin({
    $push: {
      verifications: {
        fullname: staff.firstname + " " + staff.lastname,
        bastionId: staff.bastionId,
        position
      }
    }
  })
  await updateStaff(
    { bastionId: staff.bastionId },
    { "requests.verification": true }
  )

  return apiResult("Verification for position request sent", true);
}

export const updateStaffHandler = async( update: UpdateStaffaSchema, { staff }: StaffContext ) => {
  await updateStaff(
    { email: staff.email },
    update
  )

  return apiResult("Successfully udpated profile", true);
}