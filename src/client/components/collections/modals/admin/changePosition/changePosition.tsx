import { ModalHeading } from "@/styled/shared/modal"
import { RequestPositionWrapper } from "../../staff/requestPosition/requestPosition.styled"
import { ChangePositionForm } from "@/components/collections/forms/admin/changePosition"
import { Role } from "@/src/server/models/staff.model"


type ChangePositionModalProps = {
  bastionId: string,
  successFunction: ( position: { name: string, role: Role } ) => void
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