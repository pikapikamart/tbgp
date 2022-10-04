import { 
  AdminContext, 
  AdminContextProps } from "@/components/admin/home/home.context";
import { sanitizePosition } from "@/components/admin/home/verifications/positions/positions";
import { useTrapFocus, useVerifyPosition } from "@/lib/hooks";
import { trpc } from "@/lib/trpc";
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
  const { handleVerifyPosition } = useVerifyPosition()

  return (
    <>
      <ModalExit onClick={ () => removeVerification() } />
      <ConfirmationModal onKeyDown={ registerTrapContainer }>
        <ConfirmationHeading id="modal-heading">Continue with this choice?</ConfirmationHeading>
        <ConfirmationDescription>
          { verification?.type==="accept" ? 
            <>
              This will make 
              <span> { verification.fullname } </span>
               as a verified { sanitizePosition(verification.position) } 
            </> :
            <>
              This will invalidate
              <span> { verification?.fullname }'s </span>
              request as { sanitizePosition(verification?.position!) }
            </> }
        </ConfirmationDescription>
        <ColumCenterCenter>
          <VerificationChoiceButton 
            onClick={ handleVerifyPosition }
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