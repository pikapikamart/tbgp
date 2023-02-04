import { categoryColors } from "@/components/shared/storyRequest/data"
import { 
  Category, 
  CreatedDate } from "@/components/shared/storyRequest/initial/initial.styled"
import { convertDateToString } from "@/components/shared/storyRequest/initial/utils"
import { 
  isWriteupHandler,
  isWriteupReadonly, 
  isWriteupResubmit } from "@/components/staff/writeup/utils"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { versionModalVariant } from "@/src/client/motion"
import { WriteupPhases } from "@/src/server/models/writeup.model"
import { useModalContext } from "@/store/context/modal/modal"
import { SrOnly } from "@/styled/shared/helpers"
import Link from "next/link"
import { 
  RequestMemberDate,
  RequestMemberLink, 
  RequestMembers } from "../../storyRequest/storyRequest.styled"
import { WriteupVersionNotes } from "./notes"
import { ResubmitWriteup } from "./resubmit"
import { 
  capitalizePhase,
  readonlyPhases, 
  versionIndex } from "./utils"
import { useWriteupVersion } from "./version.hook"
import { 
  TopicsListItem,
  TopicsListItemHeading,
  TopicsListItemInformation,
  VersionClose, 
  VersionContentContainer, 
  VersionsList, 
  VersionsListItem, 
  VersionStoryRequestContainer, 
  VersionWrapper } from "./version.styled"


const Version = () =>{
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const { modalRef } = useWriteupVersion()
  const currentContent = writeup.content[0]
  
  return (
    <VersionWrapper
      ref={ modalRef }
      initial="initial"
      animate="animate"
      exit="initial"
      variants={ versionModalVariant }>
      <VersionClose onClick={ modalContext.removeModal }>
        <SrOnly>Close modal</SrOnly>
      </VersionClose>
      <VersionContentContainer>
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
            <TopicsListItemInformation>{ capitalizePhase(currentContent.phase as WriteupPhases) }</TopicsListItemInformation>
          </TopicsListItem>
          { currentContent.handledBy!==undefined && (
            <TopicsListItem>
              <TopicsListItemHeading>Handled by:</TopicsListItemHeading>
              <TopicsListItemInformation>
                <Link
                  href={ `/storybuilder/${ currentContent.handledBy.username }` }
                  passHref>
                  <RequestMemberLink>{ currentContent.handledBy.firstname } { currentContent.handledBy.lastname }</RequestMemberLink>
                </Link>
              </TopicsListItemInformation>
          </TopicsListItem>
          ) }
          <TopicsListItem>
            <TopicsListItemHeading>Genre:</TopicsListItemHeading>
            <Category colored={ categoryColors[writeup.request.category] }>{ writeup.request.category.toLowerCase() }</Category>
          </TopicsListItem>
          <TopicsListItem column={ true }>
            <TopicsListItemHeading>Instruction:</TopicsListItemHeading>
            <TopicsListItemInformation>{ writeup.request.instruction }</TopicsListItemInformation>
          </TopicsListItem>
          { writeup.request.deadline && (
            <TopicsListItem column={ true }>
              <TopicsListItemHeading>Deadline:</TopicsListItemHeading>
              <TopicsListItemInformation>{ convertDateToString(writeup.request.deadline) }</TopicsListItemInformation>
            </TopicsListItem>
          ) }
          <TopicsListItem column={ true }>
            <TopicsListItemHeading>Members joined:</TopicsListItemHeading>
            <RequestMembers>
              { writeup.request.members.map(({ member, date }, index) => (
                <li key={ member.bastionId }>
                  <Link
                    href={ `/storybuilder/${ member.username }` }
                    passHref>
                    <RequestMemberLink>{ member.firstname + " " + member.lastname }</RequestMemberLink>
                  </Link>
                  <RequestMemberDate>- { `${ convertDateToString(`${ date }`, true) }, ${ new Date(date).toLocaleTimeString() }` }</RequestMemberDate>
                </li>
              )) }
            </RequestMembers>
          </TopicsListItem>
          { writeup.currentPhase==="writeup" && !!currentContent.submissions && currentContent.submissions.length>0 && (
            <TopicsListItem column={ true }>
              <TopicsListItemHeading>Members submitted:</TopicsListItemHeading>
              <RequestMembers>
                { currentContent.submissions.map(({ member, date }, index) => (
                  <li key={ member.bastionId }>
                    <Link
                      href={ `/storybuilder/${ member.username }` }
                      passHref>
                      <RequestMemberLink>{ member.firstname + " " + member.lastname }</RequestMemberLink>
                    </Link>
                    <RequestMemberDate>- { `${ convertDateToString(`${ date }`, true) }, ${ new Date(date).toLocaleTimeString() }` }</RequestMemberDate>
                  </li>
                )) }
              </RequestMembers>
            </TopicsListItem>
          ) }
          <TopicsListItem column={ true }>
            <TopicsListItemHeading>Created at:</TopicsListItemHeading>
            <TopicsListItemInformation>{ convertDateToString(writeup.request.createdAt) }</TopicsListItemInformation>
          </TopicsListItem>
          <TopicsListItem>
            <TopicsListItemHeading>Requested by:</TopicsListItemHeading>
            <TopicsListItemInformation>
              <Link
                href={ `/storybuilder/${ writeup.request.owner.username }` }
                passHref>
                  <RequestMemberLink>{ writeup.request.owner.firstname + " " + writeup.request.owner.lastname }</RequestMemberLink>
              </Link>
            </TopicsListItemInformation>
          </TopicsListItem>
        </VersionStoryRequestContainer>
        { currentContent.notes.length>0 && <WriteupVersionNotes /> }
        { !isWriteupReadonly(writeup, staff.bastionId) && !isWriteupResubmit(writeup) && isWriteupHandler(writeup, staff.bastionId) && (
          <ResubmitWriteup />
        ) }
      </VersionContentContainer>
    </VersionWrapper>
  )
}


export default Version