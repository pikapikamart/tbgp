import { 
  isEditorStaffState, 
  StaffState } from "@/store/slices/staff.slice";


export const getStoryRequests = ( staff: StaffState, params: string ) =>{
  
  if ( isEditorStaffState(staff) && params==="created" ){
    return [
      {
        name: "Open",
        data: staff.storyRequests.created.reduce(( accu, cur ) => {

          return accu.concat(cur.requests.map(request => request.username))
        }, [] as string[])
      },
      {
        name: "Created",
        data: staff.storyRequests.created
      }
    ]
  } 

  return [
    {
      name: "Pending",
      data: staff.storyRequests? staff.storyRequests.requested : []
    },
    {
      name: "Accepted",
      data: staff.storyRequests? staff.storyRequests.joined : []
    }
  ]
}

