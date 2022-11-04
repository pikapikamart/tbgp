import { VerificationDescription } from "@/components/collections/modals/verifyStaff/verifyStaff.styled"
import { CenterContent } from "@/styled/shared/helpers"
import { ModalWrapper } from "@/styled/shared/modal"
import { useSuccess } from "./success.hook"


const Success = () =>{
  useSuccess()

  return (
    <ModalWrapper 
      size="small"
      padding="small">
        <CenterContent>
          <img
            src="/icons/icon-success-publish.svg"
            alt="" />
        </CenterContent>
      <VerificationDescription>Article has been successfully published. Thank you for your work!</VerificationDescription>
    </ModalWrapper>
  )
}


export default Success