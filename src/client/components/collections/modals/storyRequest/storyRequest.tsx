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
  useStoryRequest,
  useDeleteStoryRequest } from "./storyRequest.hook"
import {
  StoryRequestWrapper,
  RequestHeader,
  RequestOwner,
  InnerContainer,
  RequestHeaderContent,
} from "./storyRequest.styled"
import { useTrackedStoryRequest } from "./storyRequest.tracked"
import { AnimatePresence } from "framer-motion"


type StoryRequestProps = {
  storyRequestId: string
}

const StoryRequest = ({ storyRequestId }: StoryRequestProps) =>{
  useStoryRequest(storyRequestId)
  const { storyRequest, isOwned } = useTrackedStoryRequest()
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
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
                requested by: { " " }
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
              <StoryRequestContent />
              <StoryRequestRequests />
            </TabInterface>
            <AnimatePresence>
              <StoryRequestNote key="story-request-note"/>
            </AnimatePresence> 
            <StoryRequestControls
              registerControl={ registerControl }
              handleDeleteStoryRequest={ handleDeleteStoryRequest } />
          </InnerContainer>
        </StoryRequestWrapper>
      ) }
    </>
  )
}


export default StoryRequest