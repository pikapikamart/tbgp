import { FullStoryRequest } from "@/store/store.types";


export const getStoryRequestInformation = ( storyRequest: FullStoryRequest | null, bastionId: string ) => {

  return {
    storyRequest,
    bastionId,
    isOwned: storyRequest?.owner.bastionId===bastionId,
    isMember: storyRequest?.members?.findIndex(member => member.bastionId===bastionId),
    isAssigned: {
      member: storyRequest?.assignedMembers?.findIndex(member => member.bastionId===bastionId),
      assigned: storyRequest?.assignedMembers!==null
    },
    hasRequested: storyRequest?.requests?.findIndex(member => member.bastionId===bastionId),
  }
}