import { useNavlinks } from "./navlinks.hook"
import { 
  NavlinksList, 
  NavlinksWrapper } from "./navlinks.styled"


const Navlinks = () =>{
  const { renderLinks } = useNavlinks()

  return (
    <NavlinksWrapper>
      <NavlinksList>
        { renderLinks() }
      </NavlinksList>
    </NavlinksWrapper>
  )
}


export default Navlinks