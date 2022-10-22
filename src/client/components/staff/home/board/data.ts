import { InitialStaffState } from "@/store/slices/staff.slice";


export const getStoryRequests = ( staff: InitialStaffState ) =>{
  const requests = [
    {
      name: "Pending",
      data: staff.storyRequests? staff.storyRequests.requested : []
    },
    {
      name: "Accepted",
      data: staff.storyRequests? staff.storyRequests.joined : []
    }
  ]

  return requests
}