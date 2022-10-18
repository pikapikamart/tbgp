import { ComboBox } from "@/components/shared/combobox"
import { useTrapFocus } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { ColoredMediumButton } from "@/styled/collections/button"
import { FormBottomControls } from "@/styled/shared/form"
import { rolesAndPositions } from "./data"
import { useSendPositionRequest } from "./requestPosition.hook"
import { RequestPositionWrapper } from "./requestPosition.styled"


const RequestPosition = () =>{
  const { 
    addFieldRef,
    handleFormSubmit } = useSendPositionRequest()
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()

  return (
    <RequestPositionWrapper
      onKeyDown={ registerTrapContainer }
      onSubmit={ handleFormSubmit }>
        <ComboBox
          labelText="Please select your position"
          name="position"
          addFieldRef={ addFieldRef }
          listBoxOptions={ rolesAndPositions } />
      <FormBottomControls>
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
      </FormBottomControls>
    </RequestPositionWrapper>
  )
}


export default RequestPosition