import { HeaderWrapper } from "@/styled/shared/header";
import { RowCenterBetween } from "@/styled/shared/helpers";


type HeaderProps = {
  children: React.ReactNode
}

const Header = ( { children }: HeaderProps ) =>{

  return (
    <HeaderWrapper as="header">
      <RowCenterBetween as="nav">
        { children }
      </RowCenterBetween>
    </HeaderWrapper>
  )
}


export default Header;