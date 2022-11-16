import { BaseModal } from "@/components/shared/modal"
import { ToastError } from "@/components/shared/toast/error"
import { ColumCenterCenter } from "@/styled/shared/helpers"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"
import { VerificationDescription } from "../../../verifyStaff/verifyStaff.styled"
import { RoundChoice } from "../../writeup.styled"
import { usePublishWriteup } from "./publish.hook"
import { WriteupPublishSuccessModal } from "./success"


type PublishProps = {
  exit: () => void
}

const Publish = ( { exit }: PublishProps ) =>{
  const {
    registerControl,
    registerTrapContainer,
    removeModal,
    handlePublishWriteup,
    isSuccess,
    isError,
    errorMessage
  } = usePublishWriteup(exit)

  return (
    <>
      { isSuccess && (
        <BaseModal 
          isChild={ true }
          exit={ () => {} }>
            <WriteupPublishSuccessModal />
        </BaseModal>
      ) }
      { isError && <ToastError
        code={ errorMessage.code }
        message={ errorMessage.message } /> }
      <ModalWrapper
        size="small"
        onKeyDown={ registerTrapContainer }>
        <ModalHeading size="medium">Publish writeup?</ModalHeading>
        <VerificationDescription>When published, this writeup will now be unavaible for all writers and editors to access. After publishing, it will now be visible in the main site.</VerificationDescription>
        <ColumCenterCenter>
          <RoundChoice
            colored="blue"
            ref={ registerControl }
            onClick={ handlePublishWriteup }>Publish writeup
          </RoundChoice>
          <RoundChoice
            colored="borderGray"
            ref={ registerControl }
            onClick={ removeModal }>Close
          </RoundChoice>
        </ColumCenterCenter>
      </ModalWrapper>
    </>
  )
}


export default Publish