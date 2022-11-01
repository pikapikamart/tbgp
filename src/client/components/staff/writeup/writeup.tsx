import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { ControlsSection } from "./controls"
import { WriteSection } from "./write"
import { useWriteup } from "./writeup.hook"
import { 
  MainContentContainer, 
  MainWrapper } from "./writeup.styled"


const Writeup = () =>{
  const { focusBackElement } = useWriteup()

  return (
    <MainWrapper>
      <MainContentContainer>
        <ModalFocusBack
          ref={ focusBackElement }
          tabIndex={ -1 }>
          <ControlsSection />
          <WriteSection />
        </ModalFocusBack>
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Writeup