import { SrOnly } from "@/styled/shared/helpers"
import { useWriteupControl } from "./control.hook"
import { 
  ControlsContainer, 
  ControlsMenu, 
  ControlsSelections, 
  TopPull } from "./controls.styled"
import { ControlsPullTab } from "./pull"


const Controls = () =>{
  const {
    isExpanded,
    handleExpansion,
    requestIsExpanded,
    handleAddModal
  } = useWriteupControl()

  return (
    <ControlsContainer>
      <TopPull
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
        <SrOnly>Writeup controls</SrOnly>
      </TopPull>
      <ControlsSelections>
        <ControlsPullTab />
        <ControlsMenu
          onClick={ handleAddModal }
          aria-expanded={ requestIsExpanded }>
          <SrOnly>Writeup full information</SrOnly>
        </ControlsMenu>
      </ControlsSelections>
    </ControlsContainer>
  )
}


export default Controls