import { useFormValidation } from "@/lib/hooks"
import { useSetupStaff } from "@/lib/hooks/store.hooks"
import { ColoredMediumButton } from "@/styled/collections/button"
import { FormBottomControls } from "@/styled/shared/form"
import { InputField } from "../../inputs/regular"
import { 
  InputBlock, 
  InputLabel, 
  InputWrapper } from "../../inputs/regular/input.styled"
import { FormRowFields } from "@/styled/shared/form"
import { useUpdateSettings } from "./settings.hook"
import { SettingsWrapper } from "./settings.styled"
import { AnimatePresence } from "framer-motion"
import { LoadingSpinner } from "@/components/shared/spinner"


const Settings = () =>{
  const { staff } = useSetupStaff()
  const {
    addFieldRef,
    handleFormSubmit
  } = useUpdateSettings( staff.username )

  if ( !staff.username ) {
    return (
      <AnimatePresence>
        <LoadingSpinner key="staff-settings-spinner" />
      </AnimatePresence>
    )
  }
  
  return (
    <SettingsWrapper onSubmit={ handleFormSubmit }>
      <FormRowFields marginBottom={ 32 }>
        <InputField
          name="firstname"
          labelText="Firstname"
          defValue={ staff.firstname }
          addFieldRef={ addFieldRef }/>
        <InputBlock>
          <InputLabel
            htmlFor="middlename"
            optional={ true }>Middlename
            <span> (optional)</span>
          </InputLabel>
          <InputWrapper
            id="middlename"
            name="middlename"
            defaultValue={ staff.middlename?? "" }
            ref={ addFieldRef } />
        </InputBlock>
      </FormRowFields>
      <FormRowFields>
        <InputField
          name="lastname"
          labelText="Lastname"
          defValue={ staff.lastname }
          addFieldRef={ addFieldRef }/>
      </FormRowFields>
      <InputBlock>
        <InputLabel htmlFor="bio">Bio</InputLabel>
        <InputWrapper
          as="textarea"
          rows={ 10 }
          id="bio"
          name="bio"
          defaultValue={ staff.bio?? "" }
          maxLength={ 400 }
          ref={ addFieldRef } />
      </InputBlock>
      <FormBottomControls>
        <ColoredMediumButton
          colored="darkBlue"
          type="submit">Update profile
        </ColoredMediumButton>
      </FormBottomControls>
    </SettingsWrapper>
  )
}


export default Settings