import { StaffState } from "@/store/slices/staff.slice";
import { 
  FullStoryRequest, 
  StaffProfile } from "@/store/store.types";
import { Dispatch } from "react";
import { createContainer } from "react-tracked";
import { useImmerReducer } from "use-immer"
import StoryRequest from "./storyRequest"


type SetStoryPayload = {
  storyRequest: FullStoryRequest,
  staff: StaffState
}

type AcceptRejectPayload = {
  choice: boolean,
  staff?: StaffProfile,
  date: Date
}

type Action = 
  | { type: "SET_STORYREQUEST", payload: SetStoryPayload }
  | { type: "APPLY" }
  | { type: "ACCEPT_REJECT", payload: AcceptRejectPayload } 

type Store = {
  storyRequest: FullStoryRequest | null,
  isOwned: boolean,
  hasRequested: boolean,
  isMember: boolean,
  isAssigned: boolean,
  isAssignedMember: boolean
}

const reducer = ( draft: Store, action: Action ) =>{
  switch(action.type) {
    case "SET_STORYREQUEST":{
      const { staff, storyRequest } = action.payload

      draft.storyRequest = action.payload.storyRequest
      draft.hasRequested = !!storyRequest.requests.find(request => request.bastionId===staff.bastionId)
      draft.isOwned = storyRequest.owner.bastionId===staff.bastionId
      draft.isMember = !!storyRequest.members.find(({ member }) => member.bastionId===staff.bastionId)
      draft.isAssigned = storyRequest.assignedMembers!==null
      draft.isAssignedMember = !!storyRequest.assignedMembers?.find(request => request.bastionId===staff.bastionId)

      return
    }
      
    case "APPLY": 
      draft.hasRequested = true

      return
   
    case "ACCEPT_REJECT": {
      const { choice, staff, date } = action.payload

      if ( !draft.storyRequest ) {
        return
      }

      if ( choice && staff ) {
        draft.storyRequest.members.push({
          member: staff,
          date
        })

        return
      }

      draft.storyRequest.requests = draft.storyRequest.requests.filter(request => request.username!==staff?.username)
    }
  }
}

const initialState: Store = {
  storyRequest: null,
  isOwned: false,
  hasRequested: false,
  isMember: false,
  isAssigned: false,
  isAssignedMember: false
}

const useValue = (): [ Store, Dispatch<Action> ] =>{
  const [ state, dispatch ] = useImmerReducer(reducer, initialState)

  return [ state, dispatch ]
}

export const {
  Provider,
  useTrackedState: useTrackedStoryRequest,
  useUpdate: useStoryDispatch
} = createContainer(useValue)


const StoryRequestTracked = ({ storyRequestId }: { storyRequestId: string  }) =>{

  return (
    <Provider>
      <StoryRequest storyRequestId={ storyRequestId } />
    </Provider>
  )
}


export default StoryRequestTracked