import { useExpansion } from "@/lib/hooks";
import { DefaultHeader } from "@/components/layout/shared/header";
import { HeaderLogo } from "@/components/layout/shared/header/logo";
import { HeaderNavlinks } from "@/components/layout/shared/header/navlinks";
import { 
  HeaderMenu, 
  HeaderMenuIcon } from "@/styled/shared/header";
  import { HeaderProfile } from "@/components/layout/shared/header/profile";
import { HeaderDropdown } from "@/components/layout/shared/header/dropdown";
;

const Header = () =>{
  const { isExpanded, handleExpansion } = useExpansion()

  return (
    <DefaultHeader>
      <HeaderLogo 
        href={ "/admin" } 
        src={ "/logos/bastion-logo-main.svg" } />
      <HeaderNavlinks type="admin" />
      <HeaderMenu as="button"
        aria-expanded={ isExpanded }
        onClick={ handleExpansion }>
          <HeaderMenuIcon />
          <span>{ isExpanded? "Close" : "Menu" }</span>
      </HeaderMenu>
      <HeaderProfile />   
      <HeaderDropdown type="admin" />
    </DefaultHeader>
  )
}


export default Header;