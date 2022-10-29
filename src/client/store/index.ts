import { 
  configureStore, 
  ThunkAction } from "@reduxjs/toolkit";
import adminReducer from "./slices/admin.slice";
import staffReducer from "./slices/staff.slice"
import writeupReducer from "./slices/writeup.slice"
import { Action } from "redux"
import { createWrapper } from "next-redux-wrapper"


export const store = () => configureStore({
  reducer: {
    admin: adminReducer,
    staff: staffReducer,
    writeup: writeupReducer
  },
  devTools: true
})

export type RootStore = ReturnType<typeof store>
export type RootState = ReturnType<RootStore["getState"]>

export const wrapper = createWrapper<RootStore>(store)

export type AppDispatch = RootStore["dispatch"]
export type AppThunk<ReturnType  = void> = ThunkAction<ReturnType, RootState, unknown, Action>