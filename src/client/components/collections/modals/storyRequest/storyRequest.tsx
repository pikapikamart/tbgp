import { TabInterface } from "@/components/shared/tablist"
import { HeadingVSmall } from "@/styled/collections/text"
import Link from "next/link"
import { StoryRequestContent } from "./content"
import { StoryRequestControls } from "./controls"
import { storyRequestParamsPath } from "./data"
import { StoryRequestNote } from "./note"
import { StoryRequestRequests } from "./requests"
import { 
  useApplyStoryRequest, 
  useStoryRequest } from "./storyRequest.hook"
import {
  StoryRequestWrapper,
  RequestHeader,
  RequestOwner,
  InnerContainer,
  RequestHeaderContent,
} from "./storyRequest.styled"
import { getStoryRequestInformation } from "./utils"


type StoryRequestProps = {
  storyRequestId: string
}

const StoryRequest = ({ storyRequestId }: StoryRequestProps) =>{
  const { storyRequest, bastionId } = useStoryRequest(storyRequestId)
  const { isOwned } = getStoryRequestInformation( storyRequest, bastionId )
  const { hasApplied, handleApplyStoryRequest } = useApplyStoryRequest( storyRequestId )
  
  return (
    <>
      { storyRequest && (
        <StoryRequestWrapper size="large">
          <RequestHeader>
            <RequestHeaderContent>
              <HeadingVSmall>{ storyRequest.title }</HeadingVSmall>
              <RequestOwner>
                requested by: { " "}
                <Link
                  href={ `/storybuilder/${ storyRequest.owner.username }` }
                  passHref>
                    <a>{ storyRequest.owner.firstname + " " + storyRequest.owner.lastname }</a>
                </Link>
              </RequestOwner>
            </RequestHeaderContent>
          </RequestHeader>
          <InnerContainer>
            <TabInterface
              paramsPaths={ isOwned? storyRequestParamsPath.owned : storyRequestParamsPath.staff }
              isRouting={ false }>
              <StoryRequestContent storyRequest={ storyRequest } />
              <StoryRequestRequests storyRequest={ storyRequest } />
            </TabInterface> 
            <StoryRequestNote
              hasApplied={ hasApplied }
              request={ getStoryRequestInformation(storyRequest, bastionId) } />
            <StoryRequestControls
              hasApplied={ hasApplied }
              request={ getStoryRequestInformation(storyRequest, bastionId) }
              handleApplyStoryRequest={ handleApplyStoryRequest } />
          </InnerContainer>
        </StoryRequestWrapper>
      ) }
    </>
  )
}


export default StoryRequest