import { memo } from "react"
import { ColoredMediumButton } from "@/styled/collections/button"
import { 
  isWriteupEditable, 
  isWriteupPartSubmitted } from "../../../utils"
import { ControlsUpdates } from "../../controls.styled"
import { useCollaborative } from "./collaborative.hook"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { SaveWriteupControl } from "../save"
import { SubmitWriteupOption } from "../options/submit"


const Collaborative = () => {
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()
  const {
    handleSubmissionModal,
    handleCancelSubmissionModal,
    cancelModal,
    submitModal
  } = useCollaborative()
 
  if ( !isWriteupEditable(writeup) ) {
    return <></>
  }
  
  if ( isWriteupPartSubmitted(writeup, staff.bastionId) ) {
    return (
      <ControlsUpdates>
        <ColoredMediumButton
          colored="red"
          onClick={ handleCancelSubmissionModal }
          aria-expanded={ cancelModal }>Cancel
        </ColoredMediumButton>
      </ControlsUpdates>
    )
  }

  return (
    <ControlsUpdates>
      <SaveWriteupControl />
      <SubmitWriteupOption
        onClick={ handleSubmissionModal }
        isExpanded={ submitModal } />
    </ControlsUpdates>
  )
}


export default memo(Collaborative)