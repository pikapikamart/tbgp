import { HeaderWrapper } from "@/styled/shared/header";
import { RowCenterBetween } from "@/styled/shared/helpers";
import { HeaderLogo } from "@/components/layout/header/logo";
import { HeaderNavlinks } from "@/components/layout/header/navlinks";
import { 
  HeaderMenu, 
  HeaderMenuIcon } from "@/styled/shared/header";
import { HeaderProfile } from "@/components/layout/header/profile";
import { HeaderDropdown } from "@/components/layout/header/dropdown";
import { 
  useHeader, 
  useHeaderAnimation } from "./header.hook";


type HeaderProps = {
  type: "admin" | "staff"
}

const returnImage = ( type: "admin" | "staff" ) =>{
  const build = process.env.NODE_ENV

  if ( build==="development" ) {
    return type==="admin"? "/logos/bastion-logo-main.svg" : "/logos/bastion-logo-builder.svg"
  }
  
}

const Header = ( { type }: HeaderProps ) =>{
  const { isExpanded, handleExpansion } = useHeader()
  const {
    hideHeaderSticky,
    showHeaderSticky
  } = useHeaderAnimation()

  return (
    <HeaderWrapper 
      as="header"
      className={`${hideHeaderSticky? "scroll-in scroll-out" : 
                              showHeaderSticky? "scroll-in" : ""}`}>
      <RowCenterBetween as="nav">
        <HeaderLogo 
          href={ type==="admin"? "/admin" : "/storybuilder" } 
          src={ type==="admin"? "/logos/bastion-logo-main.svg" : "/logos/bastion-logo-builder.svg" } />
        <HeaderNavlinks type={ type } />
        <HeaderMenu as="button"
          aria-expanded={ isExpanded }
          onClick={ handleExpansion }>
            <HeaderMenuIcon />
            <span>{ isExpanded? "Close" : "Menu" }</span>
        </HeaderMenu>
        <HeaderProfile />   
        <HeaderDropdown type={  type } />
      </RowCenterBetween>
    </HeaderWrapper>
  )
}


export default Header;