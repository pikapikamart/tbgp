import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { StoryRequest } from "@/src/server/models/story.request.model";
import { ModifyType } from "types/utils";


export type InitialStoryRequest = ModifyType<Omit<StoryRequest, "owner" | "requests" | "writeupId">, {
  members: number,
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

} = storyRequests.actions

export const selectStoryRequests = ( state: RootState  ) => state.storyRequests

export default storyRequests.reducer