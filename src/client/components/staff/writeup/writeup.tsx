import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { useModalContext } from "@/store/context/modal/modal"
import { ControlsSection } from "./controls"
import { 
  MainContentContainer, 
  MainWrapper } from "./writeup.styled"


const Writeup = () =>{
  const modalContext = useModalContext()

  return (
    <MainWrapper>
      <MainContentContainer>
        <ModalFocusBack
          ref={ modalContext.focusBackElement }
          tabIndex={ -1 }>
          <ControlsSection />
        </ModalFocusBack>
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Writeup