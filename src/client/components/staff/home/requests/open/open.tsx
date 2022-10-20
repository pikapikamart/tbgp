import { InitialStoryRequest } from "@/components/shared/storyRequest"
import { Plock } from "react-plock"
import { masonryBreakpoints } from "../data"
import { useOpenStoryRequests } from "./open.hook"


const Open = () =>{
  const openStoryRequests = useOpenStoryRequests()

  return (
    <Plock
      gap="24px" 
      breakpoints={ masonryBreakpoints }>
        { openStoryRequests.map(request => (
          <InitialStoryRequest
            key={ request.storyRequestId } 
            request={ request } />
        )) }
    </Plock>
  )
}


export default Open