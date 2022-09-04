import { Staff, STAFF_POSITIONS } from "../models/staff.model";
import { 
  CreateStaffSchema, 
  RegisterIdSchema, 
  VerifyPositionSchema} from "../schema/staff.schema";
import { getAdmin, updateAdmin } from "../services/admin.service";
import { createStaff, findStaff, updateStaff } from "../services/staff.service";
import { trpcError } from "../utils/error.util";


export const registerIdHandler = async( bastionId: RegisterIdSchema ) => {
  const foundAdmin = await getAdmin();
  
  // temporary
  if ( !foundAdmin ) {
    return trpcError("NOT_FOUND", "No admin found")
  }

  const foundBastionId = foundAdmin.bastionIds.find(id => id===bastionId);

  if( !foundBastionId ){
    return trpcError("NOT_FOUND", "No bastion Id match");
  }

  return {
    message: "ID validated",
    success: true
  }
}

export const createStaffHandler = async( staff: CreateStaffSchema ) => {
  const admin = await getAdmin();
  const foundBastionId = admin?.bastionIds.find(id => id===staff.bastionId);

  if ( !foundBastionId ) {
    return trpcError("NOT_FOUND", "No bastion Id match")
  }

  const foundStaff = await findStaff({ email: staff.email });

  if ( foundStaff ) {
    return trpcError("CONFLICT", "Email is already in use")
  }

  const newStaff: Staff = {
    ...staff,
    requests: {
      verification: false
    },
    bio: ""
  }

  await createStaff(newStaff);
  await updateAdmin({
    $pull: {
      bastionIds: staff.bastionId
    }
  })

  return {
    message: "Account created",
    success: true
  }
}

export const verifyPositionHandler = async( position: VerifyPositionSchema ) => {
  const foundStaff = await findStaff({ bastionId: position.bastionId }, { lean: false });
  const admin = await getAdmin();

  if ( !foundStaff ) {
    return trpcError("NOT_FOUND", "Please login properly")
  }

  if ( !STAFF_POSITIONS.includes(position.position) ) {
    return trpcError("BAD_REQUEST", "Send a valid position")
  }

  if ( foundStaff.position ) {
    return trpcError("CONFLICT", "Already a verified staff");
  }

  const foundVerificationRequest = admin?.verifications.find(request => request.bastionId===foundStaff.bastionId);

  if ( foundVerificationRequest ) {
    return trpcError("CONFLICT", "Already sent a verification request")
  }

  // for now, change to session later
  const positionInformation = {
    fullname: foundStaff.firstname + " " + foundStaff.lastname,
    bastionId: foundStaff.bastionId,
    position: position.position
  }

  await updateAdmin({
    $push: {
      verifications: positionInformation
    }
  })
  await updateStaff(
    { bastionId: position.bastionId },
    { "requests.verification": true }
  )

  return {
    message: "Verification sent",
    success: true
  }
}