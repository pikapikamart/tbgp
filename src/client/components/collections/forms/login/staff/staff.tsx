import { SigninInputField } from "@/components/collections/inputs/signin"
import { useUserLogin } from "@/lib/hooks"
import { ColoredBaseButton } from "@/styled/collections/button"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  SigninControlsContainer, 
  SigninControlsDivider, 
  SigninForm } from "@/styled/shared/signin"
import Link from "next/link"


const Staff = () => {
  const {
    addFieldRef,
    ariaLive,
    handleFormSubmit,
    data
  } = useUserLogin("staff", "/storybuilder", "staff.validate")

  return(
    <SigninForm onSubmit={ handleFormSubmit } >
      <SrOnly
        as="p"
        ref={ ariaLive }
        aria-live="polite" />
      <div>
        <SigninInputField
          name="email"
          type="email"
          addFieldRef={ addFieldRef } />
        <SigninInputField
          name="password"
          type="password"
          addFieldRef={ addFieldRef } />
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
  )
}


export default Staff