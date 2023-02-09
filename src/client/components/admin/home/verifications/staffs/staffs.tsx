import { BaseModal } from "@/components/shared/modal"
import { useModalContext } from "@/store/context/modal/modal"
import { 
  VerificationsListWrapper, 
  VerificationItem, 
  VerificationRequester, 
  VerificationRole,
  VerificationOption, } from "./staffs.styled"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { useEditStaffPosition } from "./staff.hook"
import { ChangePositionModal } from "@/components/collections/modals/admin/changePosition"


export const sanitizePosition = ( position: string ) => {
  const lowercasedPosition = position.split(/(?=[A-Z])/).map(item => item.toLowerCase())

  return lowercasedPosition.join(" ")
}

const staffsList = () => {
  const modalContext = useModalContext()
  const {
    staffs,
    handleRefetchStaffs
  } = useEditStaffPosition()

  const setChangeStaffPositionModal = ( bastionId: string ) => {
    modalContext.addModal(
      <BaseModal>
        <ChangePositionModal 
          bastionId={ bastionId }
          successFunction={ handleRefetchStaffs } />
      </BaseModal>
    )
  }

  const renderStaffs = () => {
    const staffsList = staffs.map(staff => (
      <VerificationItem
         key={ staff.bastionId }>
        <VerificationRequester>{ `${ staff.firstname } ${ staff.lastname }` }</VerificationRequester>
        <VerificationRole>
          Current position:
          <span>{ staff.position? sanitizePosition(staff.position.name) : "No position" }</span>
        </VerificationRole>
        <VerificationOption 
          bgColor="blue"
          type="button"
          onClick={ () => setChangeStaffPositionModal(staff.bastionId) } >Change position
        </VerificationOption>
      </VerificationItem>
    ))

    return staffsList
  }

  return (
    <ModalFocusBack
      ref={ modalContext.focusBackElement }
      tabIndex={ -1 }>
      <VerificationsListWrapper customed={ true }>
        { renderStaffs() }
      </VerificationsListWrapper>
    </ModalFocusBack>
  )
}


export default staffsList;