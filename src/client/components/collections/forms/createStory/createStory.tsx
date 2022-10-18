import { ComboBox } from "@/components/shared/combobox"
import { 
  useFormValidation, 
  useTrapFocus } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { ColoredMediumButton } from "@/styled/collections/button"
import { FormBottomControls } from "@/styled/shared/form"
import { InputField } from "../../inputs/regular"
import { CreateStoryWrapper } from "./createStory.styled"
import { storyCategories } from "./data"


const CreateStory = () =>{
  const modalContext = useModalContext()
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const {
    addFieldRef,
    handleFormSubmit
  } = useFormValidation()

  return (
    <CreateStoryWrapper
      onSubmit={ handleFormSubmit }
      onKeyDown={ registerTrapContainer }>
      <InputField
        labelText="Proposed title"
        name="title"
        addFieldRef={ addFieldRef }
        registerControl={ registerControl } />
      <ComboBox
        labelText="Story category"
        name="category"
        addFieldRef={ addFieldRef }
        listBoxOptions={ storyCategories } />
      <FormBottomControls>
        <ColoredMediumButton
          colored="darkBlue"
          type="submit">Request
        </ColoredMediumButton>
        <ColoredMediumButton
          colored="grey"
          type="button"
          ref={ registerControl }
          onClick={ () => modalContext.removeModal() }>Cancel
        </ColoredMediumButton>
      </FormBottomControls>
    </CreateStoryWrapper>
  )
}


export default CreateStory