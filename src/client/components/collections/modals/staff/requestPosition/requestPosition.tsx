import { RequestPositionForm } from "@/components/collections/forms/requestPosition"
import { ModalHeading } from "@/styled/shared/modal"
import { RequestPositionWrapper } from "./requestPosition.styled"


const RequestPosition = () => {

  return (
    <RequestPositionWrapper
      size="small"
      padding="large">
        <ModalHeading size="medium">Verify your account now
        </ModalHeading>
        <RequestPositionForm />
    </RequestPositionWrapper>
  )
}


export default RequestPosition