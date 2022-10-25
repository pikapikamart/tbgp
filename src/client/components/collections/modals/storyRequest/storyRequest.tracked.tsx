import { FullStoryRequest } from "@/store/store.types";
import { Dispatch } from "react";
import { createContainer } from "react-tracked";
import { useImmerReducer } from "use-immer"
import StoryRequest from "./storyRequest"


type Action = 
  | { type: "SET_STORYREQUEST", payload: FullStoryRequest }

type Store = {
  storyRequest: FullStoryRequest | null,

}

const reducer = ( draft: Store, action: Action ) =>{
  switch(action.type) {
    case "SET_STORYREQUEST":
      draft.storyRequest = action.payload

      return
  }
}

const initialState: Store = {
  storyRequest: null
}

const useValue = (): [ Store, Dispatch<Action> ] =>{
  const [ state, dispatch ] = useImmerReducer(reducer, initialState)

  return [ state, dispatch ]
}

export const {
  Provider,
  useTrackedState: useStoryTrackedState,
  useUpdate: useStoryDispatch
} = createContainer(useValue)


export default ({ storyRequestId }: { storyRequestId: string  }) => {

  return (
    <Provider>
      <StoryRequest storyRequestId={ storyRequestId } />
    </Provider>
  )
}