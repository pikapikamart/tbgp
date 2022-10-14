import { LoginAdminForm } from "@/components/collections/forms/login/admin";
import { SrOnly } from "@/styled/shared/helpers";
import { 
  SigninContentContainer, 
  SigninMainWrapper,
  SigninLogo,
  SigninHeading,
  SigninText } from "@/styled/shared/signin";


const Login = () => {

  return (
    <SigninMainWrapper>
      <SigninContentContainer>
        <SrOnly as="h1" >Login</SrOnly>
        <div>
          <SigninLogo src="/logos/bastion-logo.svg" alt="The Bastion Group of Publications" />
          <SigninHeading>Hello Admin!</SigninHeading>
          <SigninText>Login your bastion admin account now to manage accounts and position requests</SigninText>
          <LoginAdminForm />
        </div>
      </SigninContentContainer>
    </SigninMainWrapper>
  )
}


export default Login;