import { ColoredMediumButton } from "@/styled/collections/button"
import { 
  isWriteupEditable, 
  isWriteupHandler } from "../../../utils"
import { ControlsUpdates } from "../../controls.styled"
import { useTask } from "./task.hook"


const Task = () =>{
  const {
    staff,
    writeup,
    takeTaskModal,
    handleTakeTaskModal
  } = useTask()

  if ( !isWriteupEditable(writeup) ) {
    return <></>
  }

  if ( writeup.content[0].handledBy===undefined ) {
    return (
      <ControlsUpdates>
        <ColoredMediumButton
          colored="darkBlue"
          onClick={ handleTakeTaskModal }
          aria-expanded={ takeTaskModal }>Take task
        </ColoredMediumButton>
      </ControlsUpdates>
    )
  }

  if ( isWriteupHandler(writeup, staff.bastionId) ) {
    return (
      <ControlsUpdates>
        <ColoredMediumButton
          colored="borderGray"
          onClick={() => {}}>Save
        </ColoredMediumButton>
        <ColoredMediumButton
          colored="blue"
          onClick={() => {}}>Submit
        </ColoredMediumButton>
      </ControlsUpdates>
    )
  } 

  return (
    <></>
  )
}


export default Task