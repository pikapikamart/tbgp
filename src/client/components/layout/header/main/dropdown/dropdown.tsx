import { MainHeaderNavlinks } from "../navlinks"
import { HeaderSearchbar } from "../searchbar"
import { DropdownWrapper } from "./dropdown.styled"


const Dropdown = () => {

  return (
    <DropdownWrapper>
      <HeaderSearchbar />
      <MainHeaderNavlinks />
    </DropdownWrapper>
  )
}


export default Dropdown