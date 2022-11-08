import { HeaderWrapper } from "@/styled/shared/header"
import { 
  RowCenterBetween, 
  RowEnd} from "@/styled/shared/helpers"
import { HeaderDropdown } from "./dropdown"
import { HeaderLogo } from "../logo"
import { HeaderControls } from "./controls"
import { HeaderDate } from "./date"
import { useMainHeader } from "./main.hook"
import { MainHeaderNavlinks } from "./navlinks"
import { HeaderSearchbar } from "./searchbar"


const Main = () =>{
  const { showDesktopItems } = useMainHeader()
 
  return (
    <HeaderWrapper as="header">
      <RowCenterBetween as="nav">
        <HeaderLogo
          href="/"
          src="/logos/bastion-logo-main.svg" />
        { showDesktopItems && <MainHeaderNavlinks /> }
        <RowEnd>
          { !showDesktopItems && <HeaderControls /> }
          { showDesktopItems && <HeaderSearchbar /> }
          <HeaderDate />
          <HeaderDropdown />
        </RowEnd>
      </RowCenterBetween>
    </HeaderWrapper>
  )
}


export default Main