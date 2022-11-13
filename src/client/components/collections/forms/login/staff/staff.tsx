import { SigninInputField } from "@/components/collections/inputs/signin"
import { useUserLogin } from "@/lib/hooks"
import { ColoredBaseButton } from "@/styled/collections/button"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  SigninControlsContainer, 
  SigninControlsDivider, 
  SigninForm } from "@/styled/shared/signin"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import { LoadingSpinner } from "@/components/shared/spinner"


const Staff = () => {
  const {
    addFieldRef,
    ariaLive,
    handleFormSubmit,
    userError,
    isLoading
  } = useUserLogin("staff", "/storybuilder", "staff.validate")

  return(
    <AnimatePresence>
      { isLoading && <LoadingSpinner key="staff-login-form-spinner" /> }
      <SigninForm
        key="staff-login-form" 
        onSubmit={ handleFormSubmit } >
        <SrOnly
          as="p"
          ref={ ariaLive }
          aria-live="polite" />
        <div>
        <SigninInputField
          name="email"
          type="email"
          addFieldRef={ addFieldRef }
          error={ userError.email!==""? userError.email : undefined } />
        <SigninInputField
          name="password"
          type="password"
          addFieldRef={ addFieldRef }
          error={ userError.password!==""? userError.password : undefined } />
        </div>
        <SigninControlsContainer>
          <ColoredBaseButton
            colored="darkBlue" 
            type="submit">Login
          </ColoredBaseButton>
          <SigninControlsDivider>
            <span>or</span>
          </SigninControlsDivider>
          <Link
            href="/storybuilder/signup"
            passHref>
            <ColoredBaseButton 
              as="a"
              colored="orange">Create bastion account
            </ColoredBaseButton>
          </Link>
        </SigninControlsContainer>
      </SigninForm>
    </AnimatePresence>
  )
}


export default Staff