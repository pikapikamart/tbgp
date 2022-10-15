import { SigninInputField } from "@/components/collections/inputs/signin"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { useModalContext } from "@/store/context/modal/modal"
import { ColoredBaseButton } from "@/styled/collections/button"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  SigninControlsContainer, 
  SigninControlsDivider, 
  SigninForm } from "@/styled/shared/signin"
import { useRouter } from "next/router"
import { useSignupValidation } from "./staff.hooks"


const Staff = () =>{
  const { 
    addFieldRef,
    handleFormSubmit,
    ariaLive
  } = useSignupValidation()
  const router = useRouter()
  const modalContext = useModalContext()

  return (
    <ModalFocusBack 
      ref={ modalContext.focusBackElement }
      tabIndex={ -1 }>
      <SigninForm onSubmit={ handleFormSubmit }>
        <SrOnly
          as="p"
          aria-live="polite"
          ref={ ariaLive } />
        <div>
          <SigninInputField
            name="bastionId"
            type="password"
            addFieldRef={ addFieldRef } />
        </div>
        <SigninControlsContainer>
          <ColoredBaseButton
            colored="darkBlue" 
            type="submit">Register
          </ColoredBaseButton>
          <SigninControlsDivider>
            <span>or</span>
          </SigninControlsDivider>
          <ColoredBaseButton
            colored="grey"
            type="button"
            onClick={ () => router.back() }>Go back
          </ColoredBaseButton>
        </SigninControlsContainer>
      </SigninForm>
    </ModalFocusBack>
  )
}


export default Staff