import { StaffSignupForm } from "@/components/collections/forms/signup/staff"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { ModalProvider } from "@/store/context/modal"
import { useModalContext } from "@/store/context/modal/modal"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  SigninContentContainer, 
  SigninHeading, 
  SigninLogo, 
  SigninMainWrapper, 
  SigninText } from "@/styled/shared/signin"


const Signup = () =>{
  const modalContext = useModalContext()

  return (
    <ModalProvider>
      <SigninMainWrapper>
        <SigninContentContainer>
          <SrOnly as="h1">Signup</SrOnly>
          <div>
            <SigninLogo src="/logos/bastion-logo.svg" alt="The Bastion Group of Publications" />
            <SigninHeading>Join us!</SigninHeading>
            <SigninText>Enter your bastion id to create your bastion writer account!</SigninText>
            <StaffSignupForm />
          </div>
        </SigninContentContainer>
      </SigninMainWrapper>
    </ModalProvider>
  )
}


export default Signup