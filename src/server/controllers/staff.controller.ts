import { StaffContext } from "../middlewares/router.middleware";
import { STAFF_POSITIONS } from "../models/staff.model";
import { BaseUserSchema } from "../schemas/schema.shared";
import { 
  StaffSchema, 
  BastionIdSchema, 
  RequestPositionSchema} from "../schemas/staff.schema";
import { 
  getAdmin, 
  updateAdmin } from "../services/admin.service";
import { 
  createStaff, 
  findStaff, 
  updateStaff } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { apiResult } from "../utils/success.util";
import { getCurrentAdmin } from "./controller.utils";


export const registerBastionIdHandler = async( bastionId: BastionIdSchema ) => {
  const admin = await getCurrentAdmin();
  const foundBastionId = admin.bastionIds.find(id => id===bastionId);

  if( !foundBastionId ){
    return trpcError("NOT_FOUND", "No matching Bastion Id found");
  }

  return apiResult("Bastion Id validated", true);
}

export const createStaffHandler = async( staff: StaffSchema ) => {
  const admin = await getCurrentAdmin();
  const foundBastionId = admin?.bastionIds.find(id => id===staff.bastionId);

  if ( !foundBastionId ) {
    return trpcError("NOT_FOUND", "No matching Bastion Id found")
  }

  const foundStaff = await findStaff({ email: staff.email });

  if ( foundStaff ) {
    return trpcError("CONFLICT", "Email is already in use")
  }

  await createStaff(
    {
      ...staff,
      requests: {
        verification: false,
        story: []
      },
      bio: ""
    }
  );
  await updateAdmin({
    $pull: {
      bastionIds: staff.bastionId
    }
  })

  return apiResult("Staff account created", true);
}

export const validateStaffHandler = async( { email, password }: BaseUserSchema ) => {
  const foundStaff = await findStaff({ email }, {}, { lean: false });

  if ( !foundStaff ) {
    return trpcError("NOT_FOUND", "No user found with email")
  }
  if ( !await foundStaff.comparePassword(password) ) {
    return trpcError("BAD_REQUEST", "Password does not match")
  }

  return apiResult("Successfully validated", true);
}

// requires authentication
export const requestPositionHandler = async( input: RequestPositionSchema, ctx: StaffContext ) => {
  const { position } = input;
  const admin = await getAdmin();

  if ( !STAFF_POSITIONS[position] ) {
    return trpcError("BAD_REQUEST", "Send a valid position")
  }

  if ( ctx.staff.position ) {
    return trpcError("BAD_REQUEST", "Already a verified staff");
  }

  const foundVerificationRequest = admin?.verifications.find(request => request.bastionId===ctx.staff.bastionId);

  if ( foundVerificationRequest ) {
    return trpcError("BAD_REQUEST", "Already sent a verification request")
  }

  await updateAdmin({
    $push: {
      verifications: {
        fullname: ctx.staff.firstname + " " + ctx.staff.lastname,
        bastionId: ctx.staff.bastionId,
        position
      }
    }
  })
  await updateStaff(
    { bastionId: ctx.staff.bastionId },
    { "requests.verification": true }
  )

  return apiResult("Verification for position request sent", true);
}