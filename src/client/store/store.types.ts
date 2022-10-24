import { StoryRequest } from "@/src/server/models/story.request.model"
import { ModifyType } from "types/utils"


export type InitialStoryRequest = ModifyType<Omit<StoryRequest, "owner" | "requests" | "writeupId">, {
  members: number,
  createdAt: string
}>

type StaffProfile = {
  firstname: string,
  lastname: string,
  username: string,
  bastionId: string
}

export type FullStoryRequest = ModifyType<StoryRequest, {
  owner: StaffProfile,
  members: StaffProfile[],
  assignedMembers: StaffProfile[] | null,
  requests: StaffProfile[],
  createdAt: string
}>

export type StoryRequestsState = {
  open: InitialStoryRequest[],
  assigned: InitialStoryRequest[],
  created: InitialStoryRequest[]
}