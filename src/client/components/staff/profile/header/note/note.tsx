import { InitialStaffState } from "@/store/slices/staff.slice"
import { Note as NoteComp } from "@/components/shared/note"
import { SmallButton } from "@/styled/collections/button"
import { useHeaderProfileVerify } from "./note.hook"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"


type NoteProps = {
  profile: InitialStaffState
}

const Note = ({ profile }: NoteProps) => {
  const {
    staff,
    handleVerification,
    isExpanded,
    modalContext
  } = useHeaderProfileVerify()

  if ( staff.bastionId===profile.bastionId && !staff.position ) {
    return (
      <ModalFocusBack
        tabIndex={ -1 }
        ref={ modalContext.focusBackElement }>  
        <NoteComp text="Only verified accounts can participate and create articles. Verify your account now by sending a request, verifying your The Bastion position.">
          { !staff.verification && (
            <SmallButton 
              colored="darkBlue"
              onClick={ handleVerification }
              aria-expanded={ isExpanded } >Verify
            </SmallButton>
          )}
          { staff.verification && (
            <SmallButton 
              colored="blue"
              as="p">Verification sent
          </SmallButton>
          ) }
        </NoteComp>
      </ModalFocusBack>
    )
  }

  return (
    <></>
  )
}


export default Note