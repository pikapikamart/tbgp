import { 
  SelectOption, 
  SetSelectedOptions } from "../createStory.hook"
import Select, { MultiValue } from "react-select"
import { AssignMembersWrapper } from "./assignMembers.styled"
import { useFetchWriters } from "./assignMembers.hook"
import { FormBottomControls } from "@/styled/shared/form"
import { ColoredMediumButton } from "@/styled/collections/button"


type AssignMembersProps = {
  handleAssignMembers: SetSelectedOptions,
  exit: () => void
  defaultValue?: MultiValue<SelectOption>,
}


const AssignMembers = ({ handleAssignMembers, exit, defaultValue }: AssignMembersProps) =>{
  const { options } = useFetchWriters()

  return (
    <AssignMembersWrapper>
      <Select
        isMulti
        defaultValue={ defaultValue?? [] }
        options={ options }
        onChange={ handleAssignMembers } />
      <FormBottomControls>
        <ColoredMediumButton 
          colored="grey"
          type="button"
          onClick={ exit }>Close
        </ColoredMediumButton>
      </FormBottomControls>
    </AssignMembersWrapper>
  )
}


export default AssignMembers