import { 
  AdminContext, 
  AdminContextProps } from "@/components/admin/home/home.context";
import { sanitizePosition } from "@/components/admin/home/verifications/positions/positions";
import { useTrapFocus } from "@/lib/hooks";
import { ColumCenterCenter } from "@/styled/shared/helpers";
import { useContext } from "react";
import {
  ModalExit, 
  ConfirmationModal, 
  ConfirmationHeading, 
  ConfirmationDescription,
  VerificationChoiceButton,
  VerificationCloseButton} from "../../modal.styled";


const VerificationModal = () => {
  const { verification, removeVerification } = useContext(AdminContext) as AdminContextProps
  const [ registerControl, registerTrapContainer ] = useTrapFocus()

  return (
    <>
      <ModalExit onClick={ () => removeVerification() } />
      <ConfirmationModal onKeyDown={ registerTrapContainer }>
        <ConfirmationHeading id="modal-heading">Continue with this choice?</ConfirmationHeading>
        <ConfirmationDescription>
          { verification?.type==="accept" ? 
            <>
              This will make 
              <span> { verification.data.fullname } </span>
               as a verified { sanitizePosition(verification.data.position) } 
            </> :
            <>
              This will invalidate
              <span> { verification?.data.fullname }'s </span>
              request as { sanitizePosition(verification?.data.position!) }
            </> }
        </ConfirmationDescription>
        <ColumCenterCenter>
          <VerificationChoiceButton 
            accepted={ verification?.type==="accept" }
            ref={ registerControl }>
            { verification?.type==="accept" ? "Accept" : "Reject" } Request
          </VerificationChoiceButton>
          <VerificationCloseButton 
            onClick={ () => removeVerification() }
            ref={ registerControl }>Close</VerificationCloseButton>
        </ColumCenterCenter>
      </ConfirmationModal>
    </>
  )
}


export default VerificationModal;