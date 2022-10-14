import { 
  LoginBannerHeading, 
  LoginBannerText, 
  LoginImage } from "@/styled/shared/collection";
import { SrOnly } from "@/styled/shared/helpers";
import { LoginForm } from "./form";
import { 
  ContentContainer, 
  MainWrapper } from "./login.styled";


const Login = () => {

  return (
    <MainWrapper>
      <ContentContainer>
        <SrOnly as="h1" >Login</SrOnly>
        <div>
          <LoginImage src="/logos/bastion-logo.svg" alt="The Bastion Group of Publications" />
          <LoginBannerHeading>Hello Admin!</LoginBannerHeading>
          <LoginBannerText>Login your bastion admin account now to manage accounts and position requests</LoginBannerText>
          <LoginForm />
        </div>
      </ContentContainer>
    </MainWrapper>
  )
}


export default Login;