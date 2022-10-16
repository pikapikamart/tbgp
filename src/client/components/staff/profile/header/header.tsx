import { RequestPositionModal } from "@/components/collections/modals/staff/requestPosition"
import { BaseModal } from "@/components/shared/modal"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { Note } from "@/components/shared/note"
import { useExpansion } from "@/lib/hooks"
import { useSetupStaff } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { SmallButton } from "@/styled/collections/button"
import { HeadingLarge } from "@/styled/collections/text"
import Link from "next/link"
import { 
  HeaderBio,
  HeaderContentContainer, 
  HeaderEdit, 
  HeaderName, 
  HeaderWrapper } from "./header.styled"


const Header = () =>{
  const { staff } = useSetupStaff()
  const { isExpanded, handleExpansion } = useExpansion()
  const modalContext = useModalContext()

  if ( !staff.username ) {
    return <>spinner</>
  }

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
            { !staff.requests.verification && (
              <SmallButton 
                colored="darkBlue"
                onClick={ handleVerificationModal }
                aria-expanded={ isExpanded } >Verify
              </SmallButton>
             )}
            { staff.requests.verification && (
              <SmallButton 
                colored="blue"
                as="p">Verification sent
            </SmallButton>
            ) }
          </Note>
        ) }
      </ModalFocusBack>
      <HeaderContentContainer>
        <HeaderName>
          <HeadingLarge>{ staff.firstname + " " + staff.lastname }</HeadingLarge>
          { staff.position && <img src="/icons/icon-verified.svg" alt="" /> }
        </HeaderName>
        <HeaderBio>
          { staff.bio? staff.bio : `Hi! My name is ${ staff.firstname } ${ staff.lastname }. I have yet to fill out my bio, but one thing's for sure, I love writing for The Bastion Group of Publications!` }
        </HeaderBio>
        <Link
          href="/storybuilder/settings"
          passHref>
          <HeaderEdit as="a">Edit profile</HeaderEdit>
        </Link>
      </HeaderContentContainer>
    </HeaderWrapper>
  )
}


export default Header