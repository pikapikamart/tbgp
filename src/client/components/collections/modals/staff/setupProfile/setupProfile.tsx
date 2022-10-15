import { 
  ModalHeading, 
  ModalWrapper} from "@/styled/shared/modal"
import { SetupStaffForm } from "@/components/collections/forms/signup/staff/setup"


export type SetupProfileProps = {
  bastionId: string
}

const SetupProfile = ({ bastionId }: SetupProfileProps) =>{

  return (
    <ModalWrapper
      size="medium"
      padding="large">
        <ModalHeading
          size="medium"
          align="left"
          id="modal-heading">Fill up profile
        </ModalHeading>
        <SetupStaffForm bastionId={ bastionId } />
    </ModalWrapper>
  )
}


export default SetupProfile