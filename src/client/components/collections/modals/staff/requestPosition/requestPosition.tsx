import { RequestPositionForm } from "@/components/collections/forms/requestPosition"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"


const RequestPosition = () => {

  return (
    <ModalWrapper
      size="small"
      padding="large">
        <ModalHeading
          size="medium"
          id="modal-heading">Verify your account now
        </ModalHeading>
        <RequestPositionForm />
    </ModalWrapper>
  )
}


export default RequestPosition