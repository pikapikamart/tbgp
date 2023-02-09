import { ModalHeading } from "@/styled/shared/modal"
import { RequestPositionWrapper } from "../../staff/requestPosition/requestPosition.styled"
import { ChangePositionForm } from "@/components/collections/forms/admin/changePosition"


type ChangePositionModalProps = {
  bastionId: string,
  successFunction: () => void
}

const ChangePositionModal = ({ bastionId, successFunction }: ChangePositionModalProps) =>{

  return (
    <RequestPositionWrapper
      size="small"
      padding="large">
        <ModalHeading size="medium">Change position</ModalHeading>
        <ChangePositionForm 
          bastionId={ bastionId }
          successFunction={ successFunction } />
    </RequestPositionWrapper>
  )
}


export default ChangePositionModal