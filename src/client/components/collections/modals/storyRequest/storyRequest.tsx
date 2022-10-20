import { categoryColors } from "@/components/shared/storyRequest/data"
import { convertDateToString } from "@/components/shared/storyRequest/initial/initial"
import { 
  Category, 
  CreatedDate } from "@/components/shared/storyRequest/initial/initial.styled"
import { TabInterface } from "@/components/shared/tablist"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { FullStoryRequest } from "@/store/slices/storyRequests.slice"
import { ColoredMediumButton } from "@/styled/collections/button"
import { 
  DefaultText, 
  HeadingVSmall } from "@/styled/collections/text"
import { FormBottomControls } from "@/styled/shared/form"
import Link from "next/link"
import { useState } from "react"
import { useStoryRequest } from "./storyRequest.hook"
import {
  StoryRequestWrapper,
  RequestHeader,
  RequestOwner,
  InnerContainer,
  ContentContainer,
  RowContentContainer,
  SubHeading,
  Members,
  RequestHeaderContent
} from "./storyRequest.styled"


type StoryRequestProps = {
  storyRequestId: string
}

const StoryRequest = ({ storyRequestId }: StoryRequestProps) =>{
  const {
    storyRequest,
    isOwned,
    handleStartStoryRequest,
    handleApplyStoryRequest,
    removeModal
  } = useStoryRequest(storyRequestId)

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
              paramsPaths={[{ name: "Information", query: "" }]}
              isRouting={ false }>
              <ContentContainer>
                <RowContentContainer>
                  <SubHeading>Genre: </SubHeading>
                  <Category colored={ categoryColors[storyRequest.category] } >{ storyRequest.category.toLowerCase() }</Category>
                </RowContentContainer>
                <RowContentContainer>
                  <SubHeading>Instruction: </SubHeading>
                  <DefaultText>{ storyRequest.instruction }</DefaultText>
                </RowContentContainer>
                <RowContentContainer>
                  <SubHeading>Members: </SubHeading>
                  <Members>
                    { storyRequest.members.map(member => (
                      <li key={ member.bastionId }>
                        <Link
                          href={ `/storybuilder/${ member.username }` }
                          passHref>
                          <a>{ member.firstname + " " + member.lastname }</a>
                        </Link>
                      </li>
                    )) }
                  </Members>
                </RowContentContainer>
                <CreatedDate>{ convertDateToString(storyRequest.createdAt) }</CreatedDate>
              </ContentContainer>
            </TabInterface> 
            <FormBottomControls marginTop={ 24 }>
                { isOwned && (
                  <ColoredMediumButton 
                    colored="blue"
                    onClick={ handleStartStoryRequest }>
                      Start
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