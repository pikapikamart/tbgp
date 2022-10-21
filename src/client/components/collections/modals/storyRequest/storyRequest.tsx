import { Note } from "@/components/shared/note"
import { categoryColors } from "@/components/shared/storyRequest/data"
import { convertDateToString } from "@/components/shared/storyRequest/initial/initial"
import { 
  Category, 
  CreatedDate } from "@/components/shared/storyRequest/initial/initial.styled"
import { TabInterface } from "@/components/shared/tablist"
import { ColoredMediumButton } from "@/styled/collections/button"
import { 
  DefaultText, 
  HeadingVSmall } from "@/styled/collections/text"
import { FormBottomControls } from "@/styled/shared/form"
import Link from "next/link"
import { StoryRequestContent } from "./content"
import { storyRequestParamsPath } from "./data"
import { StoryRequestRequests } from "./requests"
import { 
  useApplyStoryRequest, 
  useStartStoryRequest, 
  useStoryRequest } from "./storyRequest.hook"
import {
  StoryRequestWrapper,
  RequestHeader,
  RequestOwner,
  InnerContainer,
  ContentContainer,
  RowContentContainer,
  SubHeading,
  RequestMembers,
  RequestHeaderContent,
  RequestNoteWrapper
} from "./storyRequest.styled"


type StoryRequestProps = {
  storyRequestId: string
}

const StoryRequest = ({ storyRequestId }: StoryRequestProps) =>{
  const {
    storyRequest,
    isOwned,
    isMember,
    hasRequested,
    removeModal
  } = useStoryRequest(storyRequestId)
  const { handleStartStoryRequest } = useStartStoryRequest( storyRequestId )
  const {
    hasApplied, 
    handleApplyStoryRequest } = useApplyStoryRequest( storyRequestId )

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
            <>
              { (hasRequested!==-1 || hasApplied) && (
                <RequestNoteWrapper>
                  <Note text="Request already sent. This note will be removed if your request has been denied or it will change if you are accepted." />
                </RequestNoteWrapper>
              ) }
              { isMember!==-1 && (
                <RequestNoteWrapper>
                  <Note text="Reqest has been successfully accepted. Wait for the owner to start the story request." />
                </RequestNoteWrapper>
              ) }
            </>
            <FormBottomControls marginTop={ 24 }>
              { isOwned && (
                <ColoredMediumButton 
                  colored="blue"
                  onClick={ handleStartStoryRequest }>
                    Start
                </ColoredMediumButton>
              ) }
              { !isOwned && !hasApplied && hasRequested===-1 && (
                <ColoredMediumButton 
                  colored="darkBlue"
                  onClick={ handleApplyStoryRequest }>
                    Request
                </ColoredMediumButton>
              ) }
              <ColoredMediumButton 
                colored="grey"
                onClick={ removeModal }>
                  Close
              </ColoredMediumButton>
            </FormBottomControls>
          </InnerContainer>
        </StoryRequestWrapper>
      ) }
    </>
  )
}


export default StoryRequest