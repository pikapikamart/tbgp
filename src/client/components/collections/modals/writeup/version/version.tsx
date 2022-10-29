import { categoryColors } from "@/components/shared/storyRequest/data"
import { Category, CreatedDate } from "@/components/shared/storyRequest/initial/initial.styled"
import { convertDateToString } from "@/components/shared/storyRequest/initial/utils"
import { useSelectWriteup } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { SrOnly } from "@/styled/shared/helpers"
import Link from "next/link"
import { RequestMemberLink, RequestMembers } from "../../storyRequest/storyRequest.styled"
import { 
  capitalizePhase,
  readonlyPhases, 
  versionIndex } from "./utils"
import { 
  TopicsListItem,
  TopicsListItemHeading,
  TopicsListItemInformation,
  VersionClose, 
  VersionsList, 
  VersionsListItem, 
  VersionStoryRequestContainer, 
  VersionWrapper } from "./version.styled"


const Version = () =>{
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()

  return (
    <VersionWrapper>
      <VersionClose onClick={ modalContext.removeModal }>
        <SrOnly>Close modal</SrOnly>
      </VersionClose>
      <VersionsList>
        { readonlyPhases.map((version, index) => (
          <VersionsListItem 
            key={ version }
            completed={ versionIndex(writeup.currentPhase) >= index }>
              { versionIndex(writeup.currentPhase) >= index? 
                <Link
                  href={ `/storybuilder/writeup/${ writeup.writeupId }/${ version }` }
                  passHref>
                  <a>{ index+1 }</a>
                </Link>
                :
                <span>{ index+1 }</span> 
              }
          </VersionsListItem>
        )) }
      </VersionsList>
      <VersionStoryRequestContainer>
        <TopicsListItem>
          <TopicsListItemHeading>Stage:</TopicsListItemHeading>
          <TopicsListItemInformation>{ capitalizePhase(writeup.currentPhase) }</TopicsListItemInformation>
        </TopicsListItem>
        { writeup.content[0].handledBy!==undefined && (
          <TopicsListItem>
            <TopicsListItemHeading>Handled by:</TopicsListItemHeading>
            <TopicsListItemInformation>
              <Link
                href={ `/storybuilder/${ writeup.content[0].handledBy.username }` }
                passHref>
                <RequestMemberLink>{ writeup.content[0].handledBy.firstname } { writeup.content[0].handledBy.lastname }</RequestMemberLink>
              </Link>
            </TopicsListItemInformation>
        </TopicsListItem>
        ) }
        <TopicsListItem>
          <TopicsListItemHeading>Genre:</TopicsListItemHeading>
          <Category colored={ categoryColors[writeup.request.category] }>{ writeup.request.category.toLowerCase() }</Category>
        </TopicsListItem>
        <TopicsListItem column={ true }>
          <TopicsListItemHeading>Description:</TopicsListItemHeading>
          <TopicsListItemInformation>{ writeup.request.instruction }</TopicsListItemInformation>
        </TopicsListItem>
        <TopicsListItem column={ true }>
          <TopicsListItemHeading>Members joined:</TopicsListItemHeading>
          <RequestMembers>
            { writeup.request.members.map(member => (
              <li key={ member.bastionId }>
                <Link
                  href={ `/storybuilder/${ member.username }` }
                  passHref>
                  <RequestMemberLink>{ member.firstname + " " + member.lastname }</RequestMemberLink>
                </Link>
              </li>
            )) }
          </RequestMembers>
        </TopicsListItem>
        <CreatedDate>{ convertDateToString(writeup.request.createdAt) }</CreatedDate>
      </VersionStoryRequestContainer>
    </VersionWrapper>
  )
}


export default Version