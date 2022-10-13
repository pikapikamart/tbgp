import { sanitizePosition } from "@/components/admin/home/verifications/list/list";
import { useTrapFocus } from "@/lib/hooks";
import { Verification } from "@/src/server/models/admin.model";
import { useModalContext } from "@/store/context/modal/modal";
import { ColumCenterCenter } from "@/styled/shared/helpers";
import {
  ConfirmationModal, 
  ConfirmationHeading, 
  ConfirmationDescription,
  VerificationChoiceButton,
  VerificationCloseButton} from "../../../shared/modal/modal.styled";
import { useVerifyPosition } from "./verifyStaff.hooks";


export type VerifyStaffModalProps = {
  accepted: boolean,
  verification: Verification
}

const VerifyStaffModal = ({ accepted, verification }: VerifyStaffModalProps) => {
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const { handleVerifyPosition } = useVerifyPosition(accepted, verification)
  const modalContext = useModalContext()

  return (
    <ConfirmationModal onKeyDown={ registerTrapContainer }>
      <ConfirmationHeading id="modal-heading">Continue with this choice?</ConfirmationHeading>
      <ConfirmationDescription>
        { accepted ? 
          <>
            This will make 
            <span> { verification.fullname } </span>
             as a verified { sanitizePosition(verification.position) } 
          </> 
          :
          <>
            This will invalidate
            <span> { verification?.fullname }'s </span>
            request as { sanitizePosition(verification?.position!) }
          </>
        }
      </ConfirmationDescription>
      <ColumCenterCenter>
        <VerificationChoiceButton 
          onClick={ handleVerifyPosition }
          accepted={ accepted }
          ref={ registerControl }>{ accepted ? "Accept" : "Reject" } Request
        </VerificationChoiceButton>
        <VerificationCloseButton 
          onClick={ modalContext.removeModal }
          ref={ registerControl }>Close
        </VerificationCloseButton>
      </ColumCenterCenter>
    </ConfirmationModal>
  )
}


export default VerifyStaffModal;