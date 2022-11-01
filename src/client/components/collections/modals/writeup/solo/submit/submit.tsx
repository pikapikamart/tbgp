import { ColumCenterCenter } from "@/styled/shared/helpers"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"
import { VerificationDescription } from "../../../verifyStaff/verifyStaff.styled"
import { useSubmitWriteup } from "../../writeup.hook"
import { RoundChoice } from "../../writeup.styled"


type SubmitProps = {
  exit: () => void
}

const Submit = ({ exit }: SubmitProps) =>{
  const {
    registerControl,
    registerTrapContainer,
    removeModal,
    handleSubmitWriteup
  } = useSubmitWriteup(exit)

  return (
    <ModalWrapper
      size="small"
      onKeyDown={ registerTrapContainer }>
      <ModalHeading size="medium">Continue submitting?</ModalHeading>
      <VerificationDescription>When submitted, the writeup will go to the next phase for editors to take task. This will remove your access to edit this file.</VerificationDescription>
      <ColumCenterCenter>
        <RoundChoice
          colored="blue"
          ref={ registerControl }
          onClick={ handleSubmitWriteup }>Continue submission
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


export default Submit