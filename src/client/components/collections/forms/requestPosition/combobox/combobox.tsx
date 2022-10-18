import { RegisterControl } from "@/lib/hooks"
import { PositionState } from "../requestPosition.hook"
import { usePositionComboBox } from "./comboBox.hook"
import { 
  ComboBoxWrapper,
  ComboBoxLabel,
  ComboBoxContentContainer,
  ComboBoxRole,
  ListBox,
  ListBoxItem
 } from "./combobox.styled"
import { positionsData } from "./data"


type ComboBoxProps = {
  registerControl: RegisterControl,
  handleSetPosition: ( position: PositionState ) => void
}

const ComboBox = ({ registerControl, handleSetPosition }: ComboBoxProps) => {
  const {
    isExpanded,
    comboBoxRef,
    listBoxRef,
    selectedIndex,
    handleOptionSelection,
    handleListboxExpansion,
    addListOptionsRef,
    handleListboxTraversing
  } = usePositionComboBox(handleSetPosition)

  const renderListbox = () => {
    const listBox = positionsData.map( (position, index) => (
      <ListBoxItem 
        key={ position.id }
        id={ position.id }
        onClick={ () => handleOptionSelection(index) }
        aria-selected={ selectedIndex===index }
        ref={ addListOptionsRef }>
        { position.name }
      </ListBoxItem>
    ))

    return listBox
  }

  return (
    <ComboBoxWrapper>
      <ComboBoxLabel id="position">Please select your position</ComboBoxLabel>
      <ComboBoxContentContainer>
        <ComboBoxRole
          role="combobox"
          onClick={ handleListboxExpansion }
          type="button"
          ref={ el => {
            comboBoxRef.current = el
            registerControl(el)
          } }
          aria-controls="listbox"
          aria-expanded={ isExpanded }
          aria-haspopup="listbox"
          aria-labelledby="position" />
        <ListBox
          id="listbox"
          role="listbox"
          tabIndex={ -1 }
          ref={ listBoxRef }
          onKeyDown={ handleListboxTraversing }
          aria-labelledby="position">
            { renderListbox() }
        </ListBox>
      </ComboBoxContentContainer>
    </ComboBoxWrapper>
  )
}


export default ComboBox