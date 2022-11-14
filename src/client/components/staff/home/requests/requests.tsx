import { BaseModal } from "@/components/shared/modal"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { TabInterface } from "@/components/shared/tablist"
import { useExpansion } from "@/lib/hooks"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { isEditorStaffState } from "@/store/slices/staff.slice"
import { 
  requestsParams, 
  requestsParamsEditor } from "./data"
import { StoryRequestsTabContent } from "./tabContent"
import { 
  CreateRequestButton, 
  RequestsWrapper, 
  StoryRequestsContentContainer } from "./requests.styled"
import { CreateStoryRequestModal } from "@/components/collections/modals/storyRequest/create"
import { simpleFadeVariant } from "@/src/client/motion"


const Requests = () =>{
  const staff = useSelectStaff()
  const modalContext = useModalContext()
  const { isExpanded, handleExpansion } = useExpansion()

  const handleSetModal = () =>{
    handleExpansion()
    modalContext.addModal(
      <BaseModal 
        exit={ handleExpansion }
        variants={ simpleFadeVariant }>
        <CreateStoryRequestModal />
      </BaseModal>
    )
  }

  return (
    <RequestsWrapper>
      <ModalFocusBack
        ref={ modalContext.focusBackElement }
        tabIndex={ -1 }>
        <TabInterface 
          paramsPaths={ isEditorStaffState(staff)? requestsParamsEditor : requestsParams }
          extraChildren={ isEditorStaffState(staff)? 
          <>
            <CreateRequestButton 
              colored="darkBlue"
              onClick={ handleSetModal }
              aria-expanded={ isExpanded } >
              <img 
                src="/icons/icon-add.svg" 
                alt=""
                width="7px" />
              <img 
                src="/icons/icon-add-large.svg" 
                alt="" />
              <span>
                Create Request
              </span>
            </CreateRequestButton>
          </> :
          <></>
          } >
          <StoryRequestsContentContainer>
            <StoryRequestsTabContent tab="" />
          </StoryRequestsContentContainer>
          <StoryRequestsContentContainer>
            <StoryRequestsTabContent tab="assigned" />
          </StoryRequestsContentContainer>
          { isEditorStaffState(staff) && (
            <StoryRequestsContentContainer>
              <StoryRequestsTabContent 
                tab="created"
                createdStoryRequests={ staff.storyRequests.created } />
            </StoryRequestsContentContainer>
          ) }
        </TabInterface>
      </ModalFocusBack>  
    </RequestsWrapper>
  )
}


export default Requests