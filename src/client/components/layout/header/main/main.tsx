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
import { MainHeaderWrapper } from "./main.styled"
import { useHeaderAnimation } from "../header.hook"
import { HeaderLogoWrapper } from "@/styled/shared/header"
import MainWebsiteLogo from "@/public/logos/bastion-logo-main.svg"


const Main = () =>{
  const { showDesktopItems } = useMainHeader()
  const {
    showHeaderSticky,
    hideHeaderSticky
  } = useHeaderAnimation()
 
  return (
    <MainHeaderWrapper 
      as="header"
      className={`${hideHeaderSticky? "scroll-in scroll-out" : 
                              showHeaderSticky? "scroll-in" : ""}`}>
      <RowCenterBetween as="nav">
      <HeaderLogoWrapper as="div">
        <MainWebsiteLogo />
      </HeaderLogoWrapper>
        {/* <HeaderLogo
          href="/"
          src="/logos/bastion-logo-main.svg" /> */}
        { showDesktopItems && <MainHeaderNavlinks /> }
        
        <RowEnd>
          { !showDesktopItems && <HeaderControls /> }
          { showDesktopItems && <HeaderSearchbar /> }
          <HeaderDate />
          <HeaderDropdown />
        </RowEnd>
      </RowCenterBetween>
    </MainHeaderWrapper>
  )
}


export default Main