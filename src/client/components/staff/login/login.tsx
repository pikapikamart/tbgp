import { StaffLoginForm } from "@/components/collections/forms/login/staff"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  SigninContentContainer, 
  SigninHeading, 
  SigninLogo, 
  SigninMainWrapper, 
  SigninText } from "@/styled/shared/signin"


const Login = () =>{

  return (
    <SigninMainWrapper>
      <SigninContentContainer>
        <SrOnly as="h1">Login</SrOnly>
        <div>
          <SigninLogo src="/logos/bastion-logo.svg" alt="The Bastion Group of Publications" />
          <SigninHeading>Welcome back!</SigninHeading>
          <SigninText>Login your bastion account now to start writing stories</SigninText>
          <StaffLoginForm />
        </div>
      </SigninContentContainer>
    </SigninMainWrapper>
  )
}


export default Login