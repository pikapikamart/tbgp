import { SigninInputField } from "@/components/collections/inputs/signin"
import { useUserLogin } from "@/lib/hooks"
import { ColoredBaseButton } from "@/styled/collections/button"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  SigninControlsContainer, 
  SigninForm } from "@/styled/shared/signin"


const Admin = () =>{
  const {
    addFieldRef,
    ariaLive,
    handleFormSubmit,
  } = useUserLogin("admin", "/admin", "admin.validate")

  return (
    <SigninForm onSubmit={ handleFormSubmit }>
      <SrOnly
        as="p"
        aria-live="polite"
        ref={ ariaLive } />
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
          type="submit">Login</ColoredBaseButton>
      </SigninControlsContainer>
    </SigninForm>
  )
}


export default Admin