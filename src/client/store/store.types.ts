import { InitialWriteup } from "@/src/server/controllers/writeup.controller"
import { StoryRequest } from "@/src/server/models/story.request.model"
import { ModifyType } from "types/utils"


export type InitialStoryRequest = ModifyType<Omit<StoryRequest, "owner" | "requests" | "writeupId">, {
  members: number,
  createdAt: string
}>

export type StaffProfile = {
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

export type PopulatedInitialWriteup = ModifyType<InitialWriteup, {
  content: {
    title: string,
    caption: string,
    phase: string,
    isSubmitted: boolean,
    isAccepted: boolean,
    reSubmit: boolean,
    requestedResubmit: boolean
  }
}>