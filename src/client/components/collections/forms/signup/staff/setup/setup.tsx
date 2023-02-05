import { useTrapFocus } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { ColoredMediumButton } from "@/styled/collections/button"
import { FormBottomControls } from "@/styled/shared/form"
import { InputField } from "@/components/collections/inputs/regular"
import { SetupWrapper } from "./setup.styled"
import { FormRowFields } from "@/styled/shared/form"
import { useSetupStaffProfile } from "./setup.hooks"
import { SetupProfileProps } from "@/components/collections/modals/staff/setupProfile/setupProfile"
import { AnimatePresence } from "framer-motion"
import { LoadingSpinner } from "@/components/shared/spinner"
import { 
  InputBlock, 
  InputLabel, 
  InputWrapper } from "@/components/collections/inputs/regular/input.styled"


const Setup = ({ bastionId }: SetupProfileProps) =>{
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()
  const {
    addFieldRef,
    handleSubmitSignupForm,
    passwordError,
    isLoading,
    emailError
  } = useSetupStaffProfile(bastionId)

  return (
    <AnimatePresence>
      { isLoading && <LoadingSpinner key="staff-setup-spinner" /> }
      <SetupWrapper
        key="staff-setup-wrapper"
        onKeyDown={ registerTrapContainer }
        onSubmit={ handleSubmitSignupForm }>
          <FormRowFields>
            <InputField
              name="firstname"
              labelText="Firstname"
              addFieldRef={ addFieldRef }
              registerControl={ registerControl }/>
            <InputBlock>
              <InputLabel 
                htmlFor="middlename"
                optional={ true }>
                Middlename 
                <span> (optional)</span>
              </InputLabel>
              <InputWrapper
                id="middlename"
                name="middlename"
                ref={ addFieldRef }>
              </InputWrapper>
            </InputBlock>
          </FormRowFields>
          <FormRowFields>
            <InputField
              name="lastname"
              labelText="Lastname"
              addFieldRef={ addFieldRef }/>
          </FormRowFields>
          <FormRowFields>
            <InputField
              name="email"
              labelText="Email address"
              addFieldRef={ addFieldRef }
              error={ emailError!==""? emailError : undefined } />
          </FormRowFields>
          <FormRowFields>
            <InputField
              name="password"
              type="password"
              labelText="Password"
              addFieldRef={ addFieldRef }/>
            <InputField
              name="passwordConfirm"
              type="password"
              labelText="Confirm password"
              error={ passwordError? "Password does not match": undefined }
              addFieldRef={ addFieldRef }/>
          </FormRowFields>
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
      </SetupWrapper>
    </AnimatePresence>
  )
}


export default Setup