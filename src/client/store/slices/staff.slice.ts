import { createSlice  } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Staff } from "@/src/server/models/staff.model";


type StaffState = Omit<Staff, "password" | "bastionId">

const initialState: StaffState = {
  email: "",
  username: "",
  firstname: "",
  lastname: "",
  requests: {
    verification: false,
    story: []
  },
}

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {

  },
  extraReducers: {
    [HYDRATE]: ( state, action ) => {
      console.log('HYDRATE', state, action.payload)
      return {
        ...state,
        ...action.payload.subject,
      }
    }
  }
})


export default staffSlice.reducer