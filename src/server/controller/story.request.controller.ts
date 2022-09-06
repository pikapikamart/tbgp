import { CATEGORIES, StoryRequest } from "../models/story.request.model";
import { STAFF_POSITIONS } from "../models/staff.model";
import { StoryRequestSchema } from "../schema/story.request.schema";
import { findStaff, updateStaff } from "../services/staff.service";
import { trpcError } from "../utils/error.util";
import { createStoryRequest, findStoryRequest } from "../services/story.request.service";
import { apiResult } from "../utils/success.util";


export const createStoryRequestHandler = async( request: StoryRequestSchema ) =>{
  const foundStaff = await findStaff({ bastionId: request.bastionId }, { lean: false });

  if ( !foundStaff ) {
    return trpcError("NOT_FOUND", "No staff found")
  }

  if ( STAFF_POSITIONS.editorInChief!==foundStaff.position ) {
    return trpcError("UNAUTHORIZED", "Only editor in chief can request story")
  }

  const foundStoryRequest = await findStoryRequest({ title: request.title });

  if ( foundStoryRequest ) {
    return trpcError("CONFLICT", "Request already created")
  }

  const sanitizeAssignment = request.assignedMembers? Array.from(new Set(request.assignedMembers)) : [];

  const storyRequestBody: StoryRequest = {
    ...request,
    category: CATEGORIES[request.category],
    assignedMembers: sanitizeAssignment,
    owner: foundStaff._id,
    members: []
  }

  const newStoryRequest = await createStoryRequest(storyRequestBody);
  await updateStaff(
    { bastionId: foundStaff.bastionId },
    { $push: {
      storyRequests: newStoryRequest._id
    } } 
  )

  return apiResult("Story request created", true);
}