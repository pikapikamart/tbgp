import { BaseModal } from "@/components/shared/modal"
import { VerifyStaffModal } from "@/components/collections/modals/verifyStaff"
import { useAppSelector } from "@/lib/hooks/store.hooks"
import { Verification } from "@/src/server/models/admin.model"
import { useModalContext } from "@/store/context/modal/modal"
import { selectAdminVerifications } from "@/store/slices/admin.slice"
import { 
  VerificationsListWrapper, 
  VerificationItem, 
  VerificationRequester, 
  VerificationRole,
  VerificationOption, } from "./list.styled"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"


export const sanitizePosition = ( position: string ) => {
  const lowercasedPosition = position.split(/(?=[A-Z])/).map(item => item.toLowerCase())

  return lowercasedPosition.join(" ")
}

const VerificationsList = () => {
  const verifications = useAppSelector(selectAdminVerifications)
  const modalContext = useModalContext()

  const setVerificationModal = ( accepted: boolean, verification: Verification ) => {
    modalContext.addModal(
      <BaseModal>
        <VerifyStaffModal
          accepted={ accepted }
          verification={ verification } />
      </BaseModal>
    )
  }

  const renderVerifications = () => {
    const verificationsList = verifications.map(verification => (
      <VerificationItem key={ verification.bastionId }>
        <VerificationRequester>{ verification.fullname }</VerificationRequester>
        <VerificationRole>
          Requesting as:
          <span>{ sanitizePosition(verification.position) }</span>
        </VerificationRole>
        <VerificationOption 
          bgColor="blue"
          type="button"
          onClick={ () => setVerificationModal(true, verification) } >Accept
        </VerificationOption>
        <VerificationOption 
          bgColor="red"
          type="button"
          onClick={ () => setVerificationModal(false, verification) } >Reject
        </VerificationOption>
      </VerificationItem>
    ))

    return verificationsList
  }

  return (
    <ModalFocusBack
      ref={ modalContext.focusBackElement }
      tabIndex={ -1 }>
      <VerificationsListWrapper>
        { renderVerifications() }
      </VerificationsListWrapper>
    </ModalFocusBack>
  )
}


export default VerificationsList;