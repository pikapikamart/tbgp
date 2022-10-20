import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { StoryRequest } from "@/src/server/models/story.request.model";
import { ModifyType } from "types/utils";
import { setOpenStoryRequestsReducer } from "../reducers/storyRequests.reducer";


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
  assignedMember: StaffProfile[],
  requests: StaffProfile[],
  createdAt: string
}>

export type StoryRequestsState = {
  open: InitialStoryRequest[],
  assigned: InitialStoryRequest[],
  created: InitialStoryRequest[]
}

const initialState: StoryRequestsState = {
  open:[],
  assigned: [],
  created: []
}

export const storyRequests = createSlice({
  name: "storyRequests",
  initialState,
  reducers: {
    setOpenStoryRequests: setOpenStoryRequestsReducer
  },
  extraReducers: {
    [HYDRATE]: ( state, action ) => {
      return {
        ...state,
        ...action.payload.storyRequests,
      }
    }
  }
})

export const {
  setOpenStoryRequests
} = storyRequests.actions

export const selectStoryRequests = ( state: RootState  ) => state.storyRequests
export const selectOpenStoryRequests = ( state: RootState ) => state.storyRequests.open

export default storyRequests.reducer