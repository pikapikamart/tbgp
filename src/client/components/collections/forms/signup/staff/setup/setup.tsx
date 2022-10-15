import { useTrapFocus } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { ColoredMediumButton } from "@/styled/collections/button"
import { ModalBottomControls } from "@/styled/shared/modal"
import { InputField } from "@/components/collections/inputs/regular"
import { 
  SetupFieldsRowContainer, 
  SetupWrapper } from "./setup.styled"
import { useSetupStaffProfile } from "./setup.hooks"
import { SetupProfileProps } from "@/components/collections/modals/staff/setupProfile/setupProfile"


const Setup = ({ bastionId }: SetupProfileProps) =>{
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()
  const {
    addFieldRef,
    handleFormSubmit,
    emailError
  } = useSetupStaffProfile(bastionId)

  return (
    <SetupWrapper
      onKeyDown={ registerTrapContainer }
      onSubmit={ handleFormSubmit }>
        <SetupFieldsRowContainer>
          <InputField
            name="firstname"
            labelText="Firstname"
            addFieldRef={ addFieldRef }
            registerControl={ registerControl }/>
          <InputField
            name="lastname"
            labelText="Lastname"
            addFieldRef={ addFieldRef }/>
        </SetupFieldsRowContainer>
        <SetupFieldsRowContainer>
          <InputField
            name="email"
            labelText="Email address"
            addFieldRef={ addFieldRef }
            error={ emailError } />
          <InputField
            name="password"
            type="password"
            labelText="Password"
            addFieldRef={ addFieldRef }/>
        </SetupFieldsRowContainer>
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
    </SetupWrapper>
  )
}


export default Setup