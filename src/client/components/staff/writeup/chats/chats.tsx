import { useExpansion } from "@/lib/hooks"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  ChatsTrigger,
  ChatsWrapper } from "./chats.styled"
import { AnimatePresence } from "framer-motion"
import { Chatbox } from "./chatbox"


const Chats = () =>{
  const { isExpanded, handleExpansion } = useExpansion()

  return (
    <ChatsWrapper>
      <ChatsTrigger
        whileTap={{ scale: .9 }}
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
        <SrOnly>{ !isExpanded? "Open " : "Close " } chats</SrOnly>
      </ChatsTrigger>
      <AnimatePresence>
        { isExpanded && <Chatbox key="chatbox"/> }
      </AnimatePresence>
    </ChatsWrapper>
  )
}


export default Chats