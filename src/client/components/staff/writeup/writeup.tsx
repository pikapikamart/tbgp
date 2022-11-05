import { ModalFocusBack } from "@/components/shared/modal/modal.styled"
import { useSetupWriteup } from "@/lib/hooks/store.hooks"
import { ControlsSection } from "./controls"
import { WriteSection } from "./write"
import { useWriteup } from "./writeup.hook"
import { 
  MainContentContainer, 
  MainWrapper } from "./writeup.styled"


const Writeup = () =>{
  const { focusBackElement } = useWriteup()
  const writeup = useSetupWriteup()

  if ( !writeup.writeupId ) {
    return <></>
  }

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