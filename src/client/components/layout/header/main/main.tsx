import { HeaderWrapper } from "@/styled/shared/header"
import { 
  RowCenterBetween, 
  RowEnd} from "@/styled/shared/helpers"
import { HeaderDropdown } from "./dropdown"
import { HeaderLogo } from "../logo"
import { HeaderControls } from "./controls"
import { HeaderDate } from "./date"


const Main = () =>{

  return (
    <HeaderWrapper as="header">
      <RowCenterBetween as="nav">
        <HeaderLogo
          href="/"
          src="/logos/bastion-logo-main.svg" />
        <RowEnd>
          <HeaderControls />
          <HeaderDate />
          <HeaderDropdown />
        </RowEnd>
      </RowCenterBetween>
    </HeaderWrapper>
  )
}


export default Main