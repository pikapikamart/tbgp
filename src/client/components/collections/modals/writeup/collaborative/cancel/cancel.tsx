import { ColumCenterCenter } from "@/styled/shared/helpers"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"
import { VerificationDescription } from "../../../verifyStaff/verifyStaff.styled"
import { RoundChoice } from "../../writeup.styled"
import { useCancelCollaborative } from "./cancel.hook"


type CancelProps = {
  exit: () => void
}

const Cancel = ({ exit }: CancelProps) =>{
  const {
    registerControl,
    registerTrapContainer,
    removeModal,
    handleCancelSubmission
  } = useCancelCollaborative(exit)

  return (
    <ModalWrapper
      size="small"
      onKeyDown={ registerTrapContainer }>
        <ModalHeading size="medium">Cancel submission?</ModalHeading>
        <VerificationDescription>Cancelling a submission will grant you the permission to edit the collaborated file again.</VerificationDescription>
        <ColumCenterCenter>
          <RoundChoice
            colored="red"
            ref={ registerControl }
            onClick={ handleCancelSubmission }>Cancel submission
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


export default Cancel