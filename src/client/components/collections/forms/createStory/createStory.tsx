import { ComboBox } from "@/components/shared/combobox"
import { BaseModal } from "@/components/shared/modal"
import { 
  ColoredMediumButton, 
  SmallButton } from "@/styled/collections/button"
import { FormBottomControls } from "@/styled/shared/form"
import { InputField } from "@/components/collections/inputs/regular"
import { 
  InputBlock, 
  InputError, 
  InputLabel, 
  InputWrapper} from "@/components/collections/inputs/regular/input.styled"
import { 
  AssignedMember, 
  AssignedMembersContainer, 
  AssignMembersContainer, 
  CreateStoryWrapper } from "./createStory.styled"
import { storyCategories } from "./data"
import { useCreateStoryRequest } from "./createStory.hook"
import { AssignMembersModal } from "@/components/collections/modals/storyRequest/create/assign"
import { AssignMembersForm } from "./assignMembers"
import { ToastError } from "@/components/shared/toast/error"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from "dayjs";


const CreateStory = () =>{
  const {
    modalContext,
    isExpanded,
    handleExpansion,
    addFieldRef,
    handleFormSubmit,
    registerControl,
    registerTrapContainer,
    assignedMembers,
    handleSetAssignedMembers,
    isError,
    errorMessage,
    deadline,
    handleSetDeadline,
  } = useCreateStoryRequest()

  return (
    <>
    { isError && <ToastError
      code={ errorMessage.code }
      message={ errorMessage.message } /> }
      { isExpanded && (
        <BaseModal 
          exit={ handleExpansion }
          isChild={ true }>
          <AssignMembersModal >
            <AssignMembersForm
              handleAssignMembers={ handleSetAssignedMembers }
              exit={ handleExpansion }
              defaultValue={ assignedMembers } />
          </AssignMembersModal>
        </BaseModal>
      ) }
      <CreateStoryWrapper
        onSubmit={ handleFormSubmit }
        onKeyDown={ registerTrapContainer }>
        <InputField
          labelText="Proposed headline"
          name="headline"
          addFieldRef={ addFieldRef }
          registerControl={ registerControl } />
        <ComboBox
          labelText="Story category"
          name="category"
          addFieldRef={ addFieldRef }
          listBoxOptions={ storyCategories } />
        <DatePicker
          PopperProps={{ placement: "bottom-end" }}
          label="Deadline"
          value={ deadline.date }
          minDate={ dayjs() }
          onChange={ handleSetDeadline }
          renderInput={ ( params ) => (
            <TextField 
              { ...params } 
              sx={{ width: "100%" }} 
              error={ deadline.error } 
              helperText={ deadline.error? "Please enter a proper deadline" : '' }
              inputProps={{ ...params.inputProps, readOnly: true }}/>
          ) } />
        <AssignMembersContainer>
          <InputBlock>
            <InputLabel id="assignmembers">Assign members (optional)</InputLabel>
            <SmallButton 
              colored="blue"
              onClick={ handleExpansion }
              type="button"
              aria-labelledby="assignmembers"
              aria-expanded={ isExpanded }>
                <span aria-hidden>Assign members</span>
            </SmallButton>
            { assignedMembers.length!==0 && (
              <AssignedMembersContainer>
                { assignedMembers.map(member => (
                  <AssignedMember key={ member.value }>{ member.label }</AssignedMember>
                )) }
              </AssignedMembersContainer>
            ) }
          </InputBlock>
        </AssignMembersContainer>
        <InputBlock>
          <InputLabel htmlFor="instruction">
            Instruction
            <span>*</span>
          </InputLabel>
          <InputWrapper
            as="textarea"
            name="instruction"
            rows={ 10 }
            id="instruction"
            ref={ addFieldRef }
            aria-required="true">
          </InputWrapper>
          <InputError>Please enter your instruction</InputError>
        </InputBlock>
        <FormBottomControls marginTop={ 16 }>
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
    </>
  )
}


export default CreateStory