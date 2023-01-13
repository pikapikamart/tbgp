import {
   AddFieldRef, 
   RegisterControl } from "@/lib/hooks"
import { useComboBox } from "./comboBox.hook"
import { 
  ComboBoxWrapper,
  ComboBoxLabel,
  ComboBoxContentContainer,
  ComboBoxRole,
  ListBox,
  ListBoxItem,
  ComboBoxInput,
  ComboBoxError
 } from "./combobox.styled"


export type ListBoxOption = {
  name: string,
  value: string,
  id: string
}

type ComboBoxProps = {
  name: string,
  labelText: string,
  addFieldRef: AddFieldRef,
  listBoxOptions: ListBoxOption[],
  registerControl?: RegisterControl,
}

const ComboBox = ({
  name,
  labelText,
  addFieldRef, 
  listBoxOptions,
  registerControl 
}: ComboBoxProps) => {
  const {
    isExpanded,
    listBoxRef,
    comboBoxRef,
    selectedIndex,
    traversingIndex,
    handleOptionSelection,
    handleListboxExpansion,
    addListOptionsRef,
    handleListboxTraversing
  } = useComboBox()

  const renderListbox = () => {
    const listBox = listBoxOptions.map( (option, index) => (
      <ListBoxItem 
        key={ option.id }
        id={ option.id }
        onClick={ () => handleOptionSelection(index) }
        aria-selected={ selectedIndex===index }
        ref={ addListOptionsRef }>
        { option.name }
      </ListBoxItem>
    ))

    return listBox
  }

  return (
    <ComboBoxWrapper>
      <ComboBoxLabel id="position">
        { labelText }
        <span>*</span>
      </ComboBoxLabel>
      <ComboBoxInput
        type="hidden"
        ref={ addFieldRef }
        name={ name }
        id={ name }
        data-name={ selectedIndex!==null? listBoxOptions[selectedIndex].name : "" }
        value={ selectedIndex!==null? listBoxOptions[selectedIndex].value : "" }
        aria-required="true"/>
      <ComboBoxContentContainer>
        <ComboBoxRole
          as="button"
          role="combobox"
          onClick={ handleListboxExpansion }
          type="button"
          ref={ el => {
            comboBoxRef.current = el
            registerControl? registerControl(el) : null
          } }
          aria-controls="listbox"
          aria-expanded={ isExpanded }
          aria-haspopup="listbox"
          aria-activedescendant={ isExpanded? listBoxOptions[traversingIndex].value : "" }
          aria-labelledby="position" >{ selectedIndex!==null? listBoxOptions[selectedIndex].name : "" }
        </ComboBoxRole>
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
      <ComboBoxError>Please select a valid { name } value</ComboBoxError>
    </ComboBoxWrapper>
  )
}


export default ComboBox