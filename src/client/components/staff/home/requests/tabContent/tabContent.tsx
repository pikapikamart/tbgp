import { InitialStoryRequest } from "@/components/shared/storyRequest/initial"
import { StoryRequestTabSchema } from "@/src/server/schemas/story.request.schema"
import { CreatedStoryRequest } from "@/store/slices/staff.slice"
import { InitialStoryRequest as InitialStoryRequestType } from "@/store/store.types"
import { Plock } from "react-plock"
import { masonryBreakpoints } from "../data"
import { useInitialStoryRequests } from "./tabContent.hook"


type TabContentProps = {
  tab: StoryRequestTabSchema,
  createdStoryRequests?: CreatedStoryRequest[]
}

const TabContent = ({ tab, createdStoryRequests }: TabContentProps) =>{
  const initialStoryRequests = useInitialStoryRequests(tab)

  const renderStoryRequests = () =>{
    const requests = (createdStoryRequests?? initialStoryRequests) as InitialStoryRequestType[] | CreatedStoryRequest[]
    const storyRequests = requests.map(request => (
      <InitialStoryRequest
        key={ request.storyRequestId } 
        request={ request } />
    ))
    
    return storyRequests
  }

  return (
    <Plock
      gap="24px" 
      breakpoints={ masonryBreakpoints }>
        { renderStoryRequests() }
    </Plock>
  )
}


export default TabContent