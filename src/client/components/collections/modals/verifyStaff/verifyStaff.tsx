import { sanitizePosition } from "@/components/admin/home/verifications/list/list";
import { useTrapFocus } from "@/lib/hooks";
import { Verification } from "@/src/server/models/admin.model";
import { useModalContext } from "@/store/context/modal/modal";
import { ColumCenterCenter } from "@/styled/shared/helpers";
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal";
import { useVerifyPosition } from "./verifyStaff.hooks";
import { 
  VerificationChoice, 
  VerificationClose, 
  VerificationDescription } from "./verifyStaff.styled";


export type VerifyStaffModalProps = {
  accepted: boolean,
  verification: Verification
}

const VerifyStaffModal = ({ accepted, verification }: VerifyStaffModalProps) => {
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const { handleVerifyPosition } = useVerifyPosition(accepted, verification)
  const modalContext = useModalContext()

  return (
    <ModalWrapper
      size="small"
      onKeyDown={ registerTrapContainer }>
      <ModalHeading size="medium">Continue with this choice?
      </ModalHeading>
      <VerificationDescription>
        { accepted ? 
          <>
            This will make 
            <span> { verification.fullname } </span>
             as a verified { sanitizePosition(verification.position.name) } 
          </> 
          :
          <>
            This will invalidate
            <span> { verification?.fullname }'s </span>
            request as { sanitizePosition(verification?.position.name!) }
          </>
        }
      </VerificationDescription>
      <ColumCenterCenter>
        <VerificationChoice 
          onClick={ handleVerifyPosition }
          accepted={ accepted }
          ref={ registerControl }>{ accepted ? "Accept" : "Reject" } Request
        </VerificationChoice>
        <VerificationClose 
          onClick={ modalContext.removeModal }
          ref={ registerControl }>Close
        </VerificationClose>
      </ColumCenterCenter>
    </ModalWrapper>
  )
}


export default VerifyStaffModal;