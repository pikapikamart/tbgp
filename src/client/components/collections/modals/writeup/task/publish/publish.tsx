import { ColumCenterCenter } from "@/styled/shared/helpers"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"
import { VerificationDescription } from "../../../verifyStaff/verifyStaff.styled"
import { RoundChoice } from "../../writeup.styled"
import { usePublishWriteup } from "./publish.hook"


const Publish = ( exit: () => void ) =>{
  const {
    registerControl,
    registerTrapContainer,
    removeModal,
    handlePublishWriteup
  } = usePublishWriteup(exit)

  return (
    <ModalWrapper
      size="small"
      onKeyDown={ registerTrapContainer }>
      <ModalHeading size="medium">Publish writeup?</ModalHeading>
      <VerificationDescription>When published, this writeup will be unavaible for all writers and editors to access. You can only access the published article.</VerificationDescription>
      <ColumCenterCenter>
        <RoundChoice
          colored="blue"
          ref={ registerControl }
          onClick={ handlePublishWriteup }>Published to article
        </RoundChoice>
        <RoundChoice
          colored="borderGray"
          ref={ registerControl }
          onClick={ removeModal }>Close
        </RoundChoice>
      </ColumCenterCenter>
    </ModalWrapper>
  )
}


export default Publish