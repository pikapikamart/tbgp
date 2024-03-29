import {
  ContentContainer,
  SubHeading,
  RowContentContainer,
  RequestMembers,
  RequestMemberLink,
  RequestMemberDate
} from "../storyRequest.styled"
import { Category } from "@/components/shared/storyRequest/initial/initial.styled"
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
      <RowContentContainer column={ true }>
        <SubHeading>Instruction: </SubHeading>
        <DefaultText>{ storyRequest.instruction }</DefaultText>
      </RowContentContainer>
      <RowContentContainer>
        <SubHeading>Deadline: </SubHeading>
        <DefaultText>{ convertDateToString(storyRequest.deadline) }</DefaultText>
      </RowContentContainer>
      { storyRequest.assignedMembers && (
        <RowContentContainer column={ true }>
          <SubHeading>Assigned members: </SubHeading>
          <RequestMembers>
            { storyRequest.assignedMembers.map((member, index) => (
              <li key={ member.bastionId }>
                <Link
                  href={ `/storybuilder/${ member.username }` }
                  passHref>
                  <RequestMemberLink>{ member.firstname + " " + member.lastname }{ index!==(storyRequest.assignedMembers??[]).length-1? "," : "" }</RequestMemberLink>
                </Link>
              </li>
            )) }
          </RequestMembers>
        </RowContentContainer>
      ) }
      { !!storyRequest.members.length && (
        <RowContentContainer column={ true }>
          <SubHeading>Members joined: </SubHeading>
          <RequestMembers>
            { storyRequest.members.map(({ member, date }) => (
              <li key={ member.bastionId }>
                <Link
                  href={ `/storybuilder/${ member.username }` }
                  passHref>
                  <RequestMemberLink>{ member.firstname + " " + member.lastname }
                  </RequestMemberLink>
                </Link>
                <RequestMemberDate>- { `${ convertDateToString(`${ date }`, true) }, ${ new Date(date).toLocaleTimeString() }` }</RequestMemberDate>
              </li>
            )) }
          </RequestMembers>
        </RowContentContainer>
      ) }
      <RowContentContainer>
        <SubHeading>Created at: </SubHeading>
        <DefaultText>{ convertDateToString(storyRequest.createdAt) }</DefaultText>
      </RowContentContainer>
    </ContentContainer>
  )
}


export default Content