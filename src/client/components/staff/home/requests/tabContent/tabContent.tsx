import { InitialStoryRequest } from "@/components/shared/storyRequest/initial"
import { StoryRequestTabSchema } from "@/src/server/schemas/story.request.schema"
import { Plock } from "react-plock"
import { masonryBreakpoints } from "../data"
import { useInitialStoryRequests } from "./tabContent.hook"


type TabContentProps = {
  tab: StoryRequestTabSchema
}

const TabContent = ({ tab }: TabContentProps) =>{
  const initialStoryRequests = useInitialStoryRequests(tab)

  return (
    <Plock
      gap="24px" 
      breakpoints={ masonryBreakpoints }>
        { initialStoryRequests.map(request => (
          <InitialStoryRequest
            key={ request.storyRequestId } 
            request={ request } />
        )) }
    </Plock>
  )
}


export default TabContent