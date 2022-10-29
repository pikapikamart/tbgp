import { WriteupVersionModal } from "@/components/collections/modals/writeup/version"
import { BaseModal } from "@/components/shared/modal"
import { useExpansion } from "@/lib/hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  ControlsContainer, 
  ControlsMenu, 
  ControlsSelections, 
  TopPull } from "./controls.styled"
import { ControlsPullTab } from "./pull"


const Controls = () =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const {
    isExpanded: requestIsExpanded,
    handleExpansion: handleRequestExpansion
  } = useExpansion()
  const modalContext = useModalContext()

  const handleAddModal = () =>{
    handleRequestExpansion()
    modalContext.addModal(
      <BaseModal
        exit={ handleRequestExpansion }
        styleReset={ true }>
          <WriteupVersionModal />
      </BaseModal>
    )
  }

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