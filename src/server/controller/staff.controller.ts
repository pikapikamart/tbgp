import { Staff } from "../models/staff.model";
import { 
  CreateStaffSchema, 
  RegisterIdSchema } from "../schema/staff.schema";
import { getAdmin, updateAdmin } from "../services/admin.service";
import { createStaff, findStaff } from "../services/staff.service";
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