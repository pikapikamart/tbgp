import { HeaderWrapper } from "@/styled/shared/header"
import { RowCenterBetween } from "@/styled/shared/helpers"
import { HeaderLogo } from "../logo"
import { HeaderDate } from "./date"


const Main = () =>{

  return (
    <HeaderWrapper as="header">
      <RowCenterBetween as="nav">
        <HeaderLogo
          href="/"
          src="/logos/bastion-logo-main.svg" />
        <HeaderDate />
      </RowCenterBetween>
    </HeaderWrapper>
  )
}


export default Main