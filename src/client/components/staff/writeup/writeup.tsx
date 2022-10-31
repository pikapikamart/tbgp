import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { useModalContext } from "@/store/context/modal/modal"
import { ControlsSection } from "./controls"
import { WriteSection } from "./write"
import { useSaveWriteup } from "./writeup.hook"
import { 
  MainContentContainer, 
  MainWrapper } from "./writeup.styled"


const Writeup = () =>{
  const modalContext = useModalContext()
  const { isSuccess } = useSaveWriteup()
  
  return (
    <MainWrapper>
      <MainContentContainer>
        <ModalFocusBack
          ref={ modalContext.focusBackElement }
          tabIndex={ -1 }>
          <ControlsSection />
          <WriteSection />
        </ModalFocusBack>
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Writeup