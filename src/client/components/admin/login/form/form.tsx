import { useAdminLogin } from "@/lib/hooks";
import { 
  DarkBlueButton,
  LoginControlsContainer,
  LoginControlWrapper,
  LoginFieldWrapper, 
  LoginForm, 
  LoginInputError, 
  LoginTextInput} from "@/styled/shared/collection"
import { SrOnly } from "@/styled/shared/helpers";


const Form = () => {
  const {
    addFieldRef,
    ariaLiveRef,
    handleFormSubmit,
    data
  } = useAdminLogin()

  return (
    <LoginForm >
      <SrOnly
        as="p" 
        aria-live="polite"
        ref={ ariaLiveRef } />
      <div>
        <LoginFieldWrapper>
          <SrOnly 
            as="label"
            htmlFor="email">Enter email
          </SrOnly>
          <LoginTextInput 
            type="text"
            id="email"
            name="email"
            placeholder="email"
            ref={ e => addFieldRef(e) } />
          <LoginInputError id="error-email">Please enter a valid email</LoginInputError>
        </LoginFieldWrapper>
        <LoginFieldWrapper>
          <SrOnly 
            as="label"
            htmlFor="password">Enter password
          </SrOnly>
          <LoginTextInput 
            type="password"
            id="password"
            name="password"
            placeholder="password"
            ref={ e => addFieldRef(e) } />
          <LoginInputError id="error-password">Please enter a valid email</LoginInputError>
        </LoginFieldWrapper>
      </div>
      <LoginControlsContainer>
        <LoginControlWrapper>
          <DarkBlueButton 
            type="button"
            onClick={ handleFormSubmit } >Login
          </DarkBlueButton>
        </LoginControlWrapper>
      </LoginControlsContainer>
    </LoginForm>
  )
}


export default Form;