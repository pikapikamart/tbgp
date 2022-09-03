import { RegisterIdSchema } from "../schema/staff.schema";
import { getAdmin } from "../services/admin.service";
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
    message: "Success",
    validated: true
  }
}