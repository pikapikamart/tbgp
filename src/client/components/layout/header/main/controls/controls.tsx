import { useExpansion } from "@/lib/hooks"
import { SrOnly } from "@/styled/shared/helpers"
import { Hamburger } from "./controls.styled"
import OpenHamburgerSvg from "@/public/icons/hamburger-open.svg"
import CloseHamburgerSvg from "@/public/icons/hamburger-close.svg"


const Controls = () =>{
  const { isExpanded, handleExpansion } = useExpansion()

  return (
    <>
      <Hamburger
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
        <OpenHamburgerSvg aria-hidden="true" />
        <CloseHamburgerSvg aria-hidden="true" />
        <SrOnly>{ isExpanded? "Close menu" : "Open menu" }</SrOnly>
      </Hamburger>
    </>
  )
}


export default Controls