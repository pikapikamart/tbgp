import { RequestPositionModal } from "@/components/collections/modals/staff/requestPosition"
import { BaseModal } from "@/components/shared/modal"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { Note } from "@/components/shared/note"
import { useExpansion } from "@/lib/hooks"
import { useStaffState } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { SmallButton } from "@/styled/collections/button"
import { HeadingLarge } from "@/styled/collections/text"
import { 
  HeaderBio,
  HeaderContentContainer, 
  HeaderEdit, 
  HeaderWrapper } from "./header.styled"


const Header = () =>{
  const staff = useStaffState()
  const { isExpanded, handleExpansion } = useExpansion()
  const modalContext = useModalContext()

  const handleVerificationModal = () =>{
    handleExpansion()
    modalContext.addModal(
      <BaseModal exit={ handleExpansion }>
        <RequestPositionModal />
      </BaseModal>
    )
  }

  return (
    <HeaderWrapper>
      <ModalFocusBack
        tabIndex={ -1 } 
        ref={ modalContext.focusBackElement }>
        { !staff.position && (
          <Note
          text="Only verified accounts can participate and create articles. Verify your account now by sending a request, verifying your The Bastion position.">
            <SmallButton 
              colored="darkBlue"
              onClick={ handleVerificationModal }
              aria-expanded={ isExpanded } >Verify</SmallButton>
          </Note>
        ) }
      </ModalFocusBack>
      <HeaderContentContainer>
        <HeadingLarge>{ staff.firstname + " " + staff.lastname }</HeadingLarge>
        <HeaderBio>
          { staff.bio? staff.bio : "Hi! My name is Raymart Pamplona. I have yet to fill out my bio, but one thing's for sure, I love writing for The Bastion Group of Publications!" }
        </HeaderBio>
        <HeaderEdit>Edit profile</HeaderEdit>
      </HeaderContentContainer>
    </HeaderWrapper>
  )
}


export default Header