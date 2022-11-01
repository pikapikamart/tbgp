import { ColoredMediumButton } from "@/styled/collections/button"
import { isWriteupEditable } from "../../../utils"
import { ControlsUpdates } from "../../controls.styled"
import { useSaveWriteup } from "../pull.hook"
import { useSolo } from "./solo.hook"


const Solo = () => {
  const {
    submitModal,
    handleSubmissionModal
  } = useSolo()
  const {
    writeup,
    handleWriteupSave
  } = useSaveWriteup()

  if ( !isWriteupEditable(writeup) ) {
    return <></>
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


export default Solo