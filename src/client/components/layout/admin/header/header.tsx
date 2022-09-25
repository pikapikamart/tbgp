import { useExpansion } from "@/lib/hooks";
import { 
  HeaderLogo, 
  HeaderMenu, 
  HeaderMenuIcon, 
  HeaderWrapper } from "@/styled/shared/header";
import { 
  BlockLink,
  RowCenterBetween, 
  SrOnly } from "@/styled/shared/helpers";
import Link from "next/link";
import { HeaderDropdown } from "./dropdown";
import { Navlinks } from "./navlinks";
import { HeaderProfile } from "./profile";


const Header = () =>{
  const { isExpanded, handleExpansion } = useExpansion()

  return (
    <HeaderWrapper as="header">
      <RowCenterBetween as="nav">
        <div>
          <Link 
            href="/admin"
            passHref>
              <BlockLink>
                <SrOnly>Homepage</SrOnly>
                <HeaderLogo
                  src="/logos/bastion-logo-main.svg" 
                  alt="The Bastion" />
              </BlockLink>
          </Link>
        </div>
        <Navlinks type="admin" />
        <HeaderMenu as="button"
          aria-expanded={ isExpanded }
          onClick={ handleExpansion }>
            <HeaderMenuIcon />
            <span>{ isExpanded? "Close" : "Menu" }</span>
        </HeaderMenu>
        <HeaderProfile />   
        <HeaderDropdown type="admin" />
      </RowCenterBetween>
    </HeaderWrapper>
  )
}


export default Header;