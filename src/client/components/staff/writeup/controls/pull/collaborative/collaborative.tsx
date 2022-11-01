import { memo } from "react"
import { ColoredMediumButton } from "@/styled/collections/button"
import { 
  isWriteupEditable, 
  isWriteupPartSubmitted } from "../../../utils"
import { ControlsUpdates } from "../../controls.styled"
import { useSaveWriteup } from "../pull.hook"
import { useCollaborative } from "./collaborative.hook"


const Collaborative = () => {
  const {
    writeup,
    staff,
    handleWriteupSave
  } = useSaveWriteup()
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
      <ColoredMediumButton
        colored="borderGray"
        onClick={ handleWriteupSave }>Save
      </ColoredMediumButton>
      <ColoredMediumButton
        colored="blue"
        onClick={ handleSubmissionModal }
        aria-expanded={ submitModal }>Submit
      </ColoredMediumButton>
    </ControlsUpdates>
  )
}


export default memo(Collaborative)