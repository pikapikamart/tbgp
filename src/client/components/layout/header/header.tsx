import { HeaderWrapper } from "@/styled/shared/header";
import { RowCenterBetween } from "@/styled/shared/helpers";
import { useExpansion } from "@/lib/hooks";
import { HeaderLogo } from "@/components/layout/header/logo";
import { HeaderNavlinks } from "@/components/layout/header/navlinks";
import { 
  HeaderMenu, 
  HeaderMenuIcon } from "@/styled/shared/header";
import { HeaderProfile } from "@/components/layout/header/profile";
import { HeaderDropdown } from "@/components/layout/header/dropdown";


type HeaderProps = {
  type: "admin" | "staff"
}

const Header = ( { type }: HeaderProps ) =>{
  const { isExpanded, handleExpansion } = useExpansion()

  return (
    <HeaderWrapper as="header">
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