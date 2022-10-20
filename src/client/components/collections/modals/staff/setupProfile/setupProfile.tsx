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
      size="large"
      padding="large">
        <ModalHeading
          size="medium"
          align="left">Fill up profile
        </ModalHeading>
        <SetupStaffForm bastionId={ bastionId } />
    </ModalWrapper>
  )
}


export default SetupProfile