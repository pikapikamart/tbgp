import { ColoredMediumButton } from "@/styled/collections/button"
import { 
  isWriteupEditable, 
  isWriteupHandler, 
  isWriteupResubmit} from "../../../utils"
import { ControlsUpdates } from "../../controls.styled"
import { useSaveWriteup } from "../pull.hook"
import { useTask } from "./task.hook"


const Task = () =>{
  const {
    staff,
    writeup,
    takeTaskModal,
    handleTakeTaskModal,
    submitModal,
    handleSubmissionModal,
    handlePublishModal,
    publishModal
  } = useTask()
  const { handleWriteupSave } = useSaveWriteup()

  if ( !isWriteupEditable(writeup) || isWriteupResubmit(writeup) ) {
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
          onClick={ handleWriteupSave }>Save
        </ColoredMediumButton>
        { writeup.content[0].phase==="finalization"? 
          <ColoredMediumButton
            colored="blue"
            onClick={ handlePublishModal }
            aria-expanded={ publishModal }>Publish
          </ColoredMediumButton>  
          :
          <ColoredMediumButton
            colored="blue"
            onClick={ handleSubmissionModal }
            aria-expanded={ submitModal }>Submit
          </ColoredMediumButton>  
      }
      </ControlsUpdates>
    )
  } 

  return (
    <></>
  )
}


export default Task