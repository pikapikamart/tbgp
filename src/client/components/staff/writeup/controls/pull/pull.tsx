import { ColoredMediumButton } from "@/styled/collections/button"
import { ControlsUpdates } from "../controls.styled"
import { 
  isWriteupEditable, 
  isWriteupMember } from "../../utils"
import { useSaveWriteup } from "./pull.hook"


const Pull = () =>{
  const {
    staff,
    writeup,
    handleWriteupSave
  } = useSaveWriteup()

  if ( writeup.currentPhase==="writeup" && isWriteupMember(writeup, staff.bastionId) ) {
    if ( isWriteupEditable(writeup) ) {
      return (
        <ControlsUpdates>
          <ColoredMediumButton
            colored="borderGray"
            onClick={ handleWriteupSave }>Save</ColoredMediumButton>
          <ColoredMediumButton
            colored="blue">Submit</ColoredMediumButton>
        </ControlsUpdates>
      )
    }
  }

  return (
    <></>
  )
}


export default Pull