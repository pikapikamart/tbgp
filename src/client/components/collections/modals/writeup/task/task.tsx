import { ColumCenterCenter } from "@/styled/shared/helpers"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"
import { VerificationDescription } from "../../verifyStaff/verifyStaff.styled"
import { RoundChoice } from "../writeup.styled"
import { useTakeTask } from "./task.hook"


type TaskProps = {
  exit: () => void
}

const Task = ( { exit }: TaskProps ) =>{
  const {
    registerControl,
    registerTrapContainer,
    removeModal,
    handleTakeTask
  } = useTakeTask(exit)

  return (
    <ModalWrapper 
      size="small"
      onKeyDown={ registerTrapContainer }>
      <ModalHeading size="medium">Continue taking this task?</ModalHeading>
      <VerificationDescription>By taking this task, you will be the only allowed editor to edit, send back and take this task again in this current phase of the writeup. Any re-submission requested made after this current phase will all be handled by you.</VerificationDescription>
      <ColumCenterCenter>
        <RoundChoice
          colored="blue"
          ref={ registerControl }
          onClick={ handleTakeTask }>Take task
        </RoundChoice>
        <RoundChoice
          colored="borderGray"
          ref={ registerControl }
          onClick={ removeModal }>Close
        </RoundChoice>
      </ColumCenterCenter>
    </ModalWrapper>
  )
}


export default Task