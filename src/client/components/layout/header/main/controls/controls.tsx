import { useExpansion } from "@/lib/hooks"
import { SrOnly } from "@/styled/shared/helpers"
import { Hamburger } from "./controls.styled"
import OpenHamburgerSvg from "@/public/icons/hamburger-open.svg"
import CloseHamburgerSvg from "@/public/icons/hamburger-close.svg"


const Controls = () =>{
  const { isExpanded, handleExpansion } = useExpansion()

  const handleDropdown = () =>{
    handleExpansion()

    isExpanded? document.body.classList.remove("no-scroll") : document.body.classList.add("no-scroll")
  }

  return (
    <>
      <Hamburger
        onClick={ handleDropdown }
        aria-expanded={ isExpanded }>
        <OpenHamburgerSvg aria-hidden="true" />
        <CloseHamburgerSvg aria-hidden="true" />
        <SrOnly>{ isExpanded? "Close menu" : "Open menu" }</SrOnly>
      </Hamburger>
    </>
  )
}


export default Controls