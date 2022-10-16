import { useTrapFocus } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { ColoredMediumButton } from "@/styled/collections/button"
import { ModalBottomControls } from "@/styled/shared/modal"
import { PositionComboBox } from "./combobox"
import { useSendPositionRequest } from "./requestPosition.hook"
import { RequestPositionWrapper } from "./requestPosition.styled"


const RequestPosition = () =>{
  const { 
    handleSetPosition,
    handlePositionRequest } = useSendPositionRequest()
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()

  return (
    <RequestPositionWrapper
      onKeyDown={ registerTrapContainer }
      onSubmit={ handlePositionRequest }>
      <PositionComboBox 
        registerControl={ registerControl }
        handleSetPosition={ handleSetPosition } />
      <ModalBottomControls>
        <ColoredMediumButton
          colored="darkBlue"
          type="submit">Register
        </ColoredMediumButton>
        <ColoredMediumButton
          colored="grey"
          type="button"
          ref={ registerControl }
          onClick={ () => modalContext.removeModal() }>Cancel
        </ColoredMediumButton>
      </ModalBottomControls>
    </RequestPositionWrapper>
  )
}


export default RequestPosition