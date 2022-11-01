import { ColumCenterCenter } from "@/styled/shared/helpers"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"
import { VerificationDescription } from "../../../verifyStaff/verifyStaff.styled"
import { RoundChoice } from "../../writeup.styled"
import { useSubmitCollaborative } from "./collaborative.hook"


type CollaborativeProps = {
  exit: () => void
}

const Collaborative = ({ exit }: CollaborativeProps) =>{
  const {
    registerControl,
    registerTrapContainer,
    removeModal,
    handleSubmitWriteup
  } = useSubmitCollaborative(exit)

  return (
    <ModalWrapper
      size="small"
      onKeyDown={ registerTrapContainer }>
        <ModalHeading size="medium">Continue submitting?</ModalHeading>
        <VerificationDescription>A writeup collaboration will only be submitted when all members requested a submission. By requesting, you will no longer be able to edit the file.</VerificationDescription>
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


export default Collaborative