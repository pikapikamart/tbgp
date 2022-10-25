import { useExpansion } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { InitialStoryRequest } from "@/store/store.types"
import { RowCenter, RowCenterBetween } from "@/styled/shared/helpers"
import { BaseModal } from "@/components/shared/modal"
import { categoryColors } from "../data"
import { 
  StoryRequestWrapper,
  InitialRequestHeader,
  Title,
  Category,
  JoinedCount,
  InitialRequestFooter,
  Instruction,
  CreatedDate
 } from "./initial.styled"
import { StoryRequestModal } from "@/components/collections/modals/storyRequest"
import { CreatedStoryRequest, isCreatedStoryRequest } from "@/store/slices/staff.slice"
import { convertDateToString } from "./utils"


type StoryRequestProps = {
  request: InitialStoryRequest | CreatedStoryRequest
}

const StoryRequest = ({ request }: StoryRequestProps) =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const modalContext = useModalContext()

  const handleSetModal = () =>{
    handleExpansion()
    modalContext.addModal(
      <BaseModal exit={ handleExpansion }>
        <StoryRequestModal storyRequestId={ request.storyRequestId } />
      </BaseModal>
    )
  }

  return (
    <StoryRequestWrapper>
      <InitialRequestHeader>
        <Title
          onClick={ handleSetModal }
          aria-expanded={ isExpanded }>{ request.title }</Title>
        <RowCenter>
          <Category colored={ categoryColors[request.category] }>{ request.category.toLowerCase() }</Category>
          <JoinedCount as="p">
            <img 
            src="/icons/icon-profile-small.svg"
            alt="" />
            <span>{ isCreatedStoryRequest(request)? request.members.length : request.members } joined</span>
          </JoinedCount>
        </RowCenter>
      </InitialRequestHeader>
      <InitialRequestFooter>
        <Instruction>{ request.instruction }</Instruction>
        <RowCenterBetween>
          <CreatedDate>{ convertDateToString(request.createdAt) }</CreatedDate>
          { isCreatedStoryRequest(request) && request.requests.length!==0 && (
            <Category colored="orange">{ request.requests.length } open { request.requests.length>1? "requests" : "request" }!</Category>
          ) }
        </RowCenterBetween>
      </InitialRequestFooter>
    </StoryRequestWrapper>
  )
}


export default StoryRequest