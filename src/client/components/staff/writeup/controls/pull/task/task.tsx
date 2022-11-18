import { ColoredMediumButton } from "@/styled/collections/button"
import { 
  isWriteupEditable, 
  isWriteupHandler } from "../../../utils"
import { ControlsUpdates } from "../../controls.styled"
import { SubmitWriteupOption } from "../options/submit"
import { SaveWriteupControl } from "../save"
import { 
  notValidGraphicsBanner, 
  useTask } from "./task.hook"


const Task = () =>{
  const {
    staff,
    writeup,
    takeTaskModal,
    handleTakeTaskModal,
    submitModal,
    handleSubmissionModal,
    handlePublishModal,
    publishModal,
    savedImage
  } = useTask()

  if ( !isWriteupEditable(writeup) || writeup.content[0].requestedResubmit ) {
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
        <SaveWriteupControl />
        { writeup.content[0].phase==="finalization"? 
          <ColoredMediumButton
            colored="blue"
            onClick={ handlePublishModal }
            aria-expanded={ publishModal }>Publish
          </ColoredMediumButton>  
          :
          <SubmitWriteupOption
            onClick={ handleSubmissionModal }
            isExpanded={ submitModal }
            validation={ writeup.currentPhase==="graphics" && !savedImage } />
      }
      </ControlsUpdates>
    )
  } 

  return (
    <></>
  )
}


export default Task