import { useTrapFocus } from "@/lib/hooks"
import { RequestPositionWrapper } from "../../requestPosition/requestPosition.styled"
import { useChangePositionForm } from "./changePosition.hook"
import { ComboBox } from "@/components/shared/combobox"
import { rolesAndPositions } from "../../requestPosition/data"
import { FormBottomControls } from "@/styled/shared/form"
import { ColoredMediumButton } from "@/styled/collections/button"
import { useModalContext } from "@/store/context/modal/modal"


type ChangePositionFormProps = {
  bastionId: string,
  successFunction: () => void
}

const ChangePositionForm = ({ bastionId, successFunction }: ChangePositionFormProps) =>{
  const {
    addFieldRef,
    handleFormSubmit
  } = useChangePositionForm(bastionId, successFunction)
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()

  return (
    <RequestPositionWrapper
      onKeyDown={ registerTrapContainer }
      onSubmit={ handleFormSubmit }>
        <ComboBox
          labelText="Please select a position"
          name="position"
          addFieldRef={ addFieldRef }
          listBoxOptions={ rolesAndPositions } />
        <FormBottomControls>
          <ColoredMediumButton
            colored="blue"
            type="submit">Edit
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


export default ChangePositionForm