import { PayloadAction } from "@reduxjs/toolkit";
import { 
  InitialStoryRequest, 
  StoryRequestsState } from "../slices/storyRequests.slice";


export const setOpenStoryRequestsReducer = ( state: StoryRequestsState, action: PayloadAction<InitialStoryRequest[]> ) =>{
  state.open = action.payload
}