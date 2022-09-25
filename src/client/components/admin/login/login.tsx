import { 
  LoginBannerHeading, 
  LoginBannerText, 
  LoginImage } from "@/styled/shared/collection";
import { SrOnly } from "@/styled/shared/helpers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LoginForm } from "./form";
import { 
  ContentContainer, 
  MainWrapper } from "./login.styled";


const Login = () => {
  const router = useRouter()
  const { data, status } = useSession()

  if ( data?.user ) {
    router.replace("/admin")
  }

  if ( status==="loading" || status==="authenticated" ) {
    return <div></div>
  }

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