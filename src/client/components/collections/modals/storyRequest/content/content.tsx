import {
  ContentContainer,
  SubHeading,
  RowContentContainer,
  RequestMembers,
  RequestMemberLink
} from "../storyRequest.styled"
import { 
  Category,
  CreatedDate } from "@/components/shared/storyRequest/initial/initial.styled"
import { categoryColors } from "@/components/shared/storyRequest/data"
import { DefaultText } from "@/styled/collections/text"
import Link from "next/link"
import { convertDateToString } from "@/components/shared/storyRequest/initial/utils"
import { useTrackedStoryRequest } from "../storyRequest.tracked"


const Content = () =>{
  const { storyRequest } = useTrackedStoryRequest()

  if ( !storyRequest ) {
    return <></>
  }

  return (
    <ContentContainer>
      <RowContentContainer>
        <SubHeading>Genre: </SubHeading>
        <Category colored={ categoryColors[storyRequest.category] } >{ storyRequest.category.toLowerCase() }</Category>
      </RowContentContainer>
      <RowContentContainer>
        <SubHeading>Instruction: </SubHeading>
        <DefaultText>{ storyRequest.instruction }</DefaultText>
      </RowContentContainer>
      { storyRequest.assignedMembers && (
        <RowContentContainer>
          <SubHeading>Assigned members: </SubHeading>
          <RequestMembers>
            { storyRequest.assignedMembers.map(member => (
              <li key={ member.bastionId }>
                <Link
                  href={ `/storybuilder/${ member.username }` }
                  passHref>
                  <RequestMemberLink>{ member.firstname + " " + member.lastname }</RequestMemberLink>
                </Link>
              </li>
            )) }
          </RequestMembers>
        </RowContentContainer>
      ) }
      <RowContentContainer>
        <SubHeading>Members joined: </SubHeading>
        <RequestMembers>
          { storyRequest.members.map(member => (
            <li key={ member.bastionId }>
              <Link
                href={ `/storybuilder/${ member.username }` }
                passHref>
                <RequestMemberLink>{ member.firstname + " " + member.lastname }</RequestMemberLink>
              </Link>
            </li>
          )) }
        </RequestMembers>
      </RowContentContainer>
      <CreatedDate>{ convertDateToString(storyRequest.createdAt) }</CreatedDate>
    </ContentContainer>
  )
}


export default Content