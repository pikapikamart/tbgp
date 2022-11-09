import { useSetupWriteup } from "@/lib/hooks/store.hooks"
import { ControlsSection } from "./controls"
import { WriteSection } from "./write"
import { useWriteup } from "./writeup.hook"
import { 
  MainContentContainer, 
  MainWrapper } from "./writeup.styled"


const Writeup = () =>{
  const { focusBackElement } = useWriteup()
  const {
    writeup,
    isSuccess,
    isFetching
  } = useSetupWriteup()

  if ( !writeup.writeupId || !isSuccess || isFetching ) {
    return <></>
  }

  return (
    <MainWrapper>
      <MainContentContainer
        ref={ focusBackElement }
        tabIndex={ -1 }>
        <ControlsSection />
        <WriteSection />
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Writeup