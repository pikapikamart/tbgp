import { SigninInputField } from "@/components/collections/inputs/signin"
import { LoadingSpinner } from "@/components/shared/spinner"
import { useUserLogin } from "@/lib/hooks"
import { ColoredBaseButton } from "@/styled/collections/button"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  SigninControlsContainer, 
  SigninForm } from "@/styled/shared/signin"
import { AnimatePresence } from "framer-motion"


const Admin = () =>{
  const {
    addFieldRef,
    ariaLive,
    handleFormSubmit,
    userError,
    isLoading
  } = useUserLogin("admin", "/admin", "admin.validate")

  return (
    <AnimatePresence>
      { isLoading && <LoadingSpinner key="admin-login-form-spinner" /> }
      <SigninForm
        key="admin-login-form" 
        onSubmit={ handleFormSubmit }>
        <SrOnly
          as="p"
          aria-live="polite"
          ref={ ariaLive } />
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
            type="submit">Login</ColoredBaseButton>
        </SigninControlsContainer>
      </SigninForm>
    </AnimatePresence>
  )
}


export default Admin