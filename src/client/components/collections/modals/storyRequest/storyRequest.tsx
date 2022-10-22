import { BaseModal } from "@/components/shared/modal"
import { TabInterface } from "@/components/shared/tablist"
import { useTrapFocus } from "@/lib/hooks"
import { HeadingVSmall } from "@/styled/collections/text"
import Link from "next/link"
import { StoryRequestContent } from "./content"
import { StoryRequestControls } from "./controls"
import { storyRequestParamsPath } from "./data"
import { DeleteStoryRequestModal } from "./delete"
import { StoryRequestNote } from "./note"
import { StoryRequestRequests } from "./requests"
import { 
  useApplyStoryRequest, 
  useStoryRequest,
  useDeleteStoryRequest } from "./storyRequest.hook"
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
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const { isOwned } = getStoryRequestInformation( storyRequest, bastionId )
  const { hasApplied, handleApplyStoryRequest } = useApplyStoryRequest( storyRequestId )
  const { 
    isDeleting, 
    handleDeleteStoryRequest,
    handleConfirmDeleteStoryRequest } = useDeleteStoryRequest(storyRequestId)

  return (
    <>
      { isDeleting && (
        <BaseModal 
          isChild={ true }
          exit={ handleDeleteStoryRequest }>
            <DeleteStoryRequestModal 
              exit={ handleDeleteStoryRequest }
              handleConfirmDelete={ handleConfirmDeleteStoryRequest } />
        </BaseModal>
      ) }
      { storyRequest && (
        <StoryRequestWrapper 
          size="large"
          onKeyDown={ registerTrapContainer }>
          <RequestHeader>
            <RequestHeaderContent>
              <HeadingVSmall>{ storyRequest.title }</HeadingVSmall>
              <RequestOwner>
                requested by: { " "}
                <Link
                  href={ `/storybuilder/${ storyRequest.owner.username }` }
                  passHref>
                    <a ref={ registerControl }>{ storyRequest.owner.firstname + " " + storyRequest.owner.lastname }</a>
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
              registerControl={ registerControl }
              hasApplied={ hasApplied }
              request={ getStoryRequestInformation(storyRequest, bastionId) }
              handleApplyStoryRequest={ handleApplyStoryRequest }
              handleDeleteStoryRequest={ handleDeleteStoryRequest } />
          </InnerContainer>
        </StoryRequestWrapper>
      ) }
    </>
  )
}


export default StoryRequest