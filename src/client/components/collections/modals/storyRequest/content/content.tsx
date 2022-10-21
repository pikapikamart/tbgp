import {
  ContentContainer,
  SubHeading,
  RowContentContainer,
  RequestMembers
} from "../storyRequest.styled"
import { 
  Category,
  CreatedDate } from "@/components/shared/storyRequest/initial/initial.styled"
import { categoryColors } from "@/components/shared/storyRequest/data"
import { FullStoryRequest } from "@/store/slices/storyRequests.slice"
import { DefaultText } from "@/styled/collections/text"
import Link from "next/link"
import { convertDateToString } from "@/components/shared/storyRequest/initial/initial"


type ContentProps = {
  storyRequest: FullStoryRequest
}

const Content = ({ storyRequest }: ContentProps) =>{

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
      <RowContentContainer>
        <SubHeading>Members: </SubHeading>
        <RequestMembers>
          { storyRequest.members.map(member => (
            <li key={ member.bastionId }>
              <Link
                href={ `/storybuilder/${ member.username }` }
                passHref>
                <a>{ member.firstname + " " + member.lastname }</a>
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