import { useSelectStaff, useSetupWriteup } from "@/lib/hooks/store.hooks"
import { ChatsSection } from "./chats"
import { ControlsSection } from "./controls"
import { 
  isWriteupCollaborative, 
  isWriteupMember } from "./utils"
import { WriteSection } from "./write"
import { useWriteup } from "./writeup.hook"
import { 
  MainContentContainer, 
  MainWrapper } from "./writeup.styled"
import { AnimatePresence } from "framer-motion"


const Writeup = () =>{
  const { focusBackElement } = useWriteup()
  const {
    writeup,
    isSuccess,
    isFetching
  } = useSetupWriteup()
  const staff = useSelectStaff()

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
        <AnimatePresence>
          { writeup.currentPhase==="writeup" && 
            isWriteupCollaborative(writeup) && 
            isWriteupMember(writeup, staff.bastionId) && <ChatsSection key="collaborative-chatbox" /> }

        </AnimatePresence>
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Writeup