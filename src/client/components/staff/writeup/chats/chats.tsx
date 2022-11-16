import { SrOnly } from "@/styled/shared/helpers"
import { 
  ChatsTrigger,
  ChatsWrapper, 
  UnseenChats} from "./chats.styled"
import { AnimatePresence } from "framer-motion"
import { Chatbox } from "./chatbox"
import { useChats } from "./chats.hook"
import { 
  ChatboxCompose, 
  ChatboxComposeContainer, 
  ChatboxSend } from "./chatbox/chatbox.styled"


const Chats = () =>{
  const { 
    isExpanded, 
    handleExpansion,
    handleTextareaResize,
    currentChats,
    chatRef,
    chatsContainer,
    handleSendChat,
    viewedChatsLength,
    handleChatKeydown } = useChats()

  return (
    <ChatsWrapper>
      { currentChats.length-viewedChatsLength!==0 && !isExpanded && <UnseenChats>{ currentChats.length - viewedChatsLength }</UnseenChats> }
      <ChatsTrigger
        whileTap={{ scale: .9 }}
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
        <SrOnly>{ !isExpanded? "Open " : "Close " } chats</SrOnly>
      </ChatsTrigger>
      <AnimatePresence>
        { isExpanded && (
        <Chatbox 
          key="chatbox"
          chatsContainer={ chatsContainer }
          chats={ currentChats }>
            <ChatboxComposeContainer>
              <ChatboxCompose
                placeholder="your message..."
                ref={ chatRef }
                onInput={ handleTextareaResize }
                onKeyDown={ handleChatKeydown } />
              <ChatboxSend
                type="button" 
                onClick={ handleSendChat }>
                <SrOnly>Send message</SrOnly>
              </ChatboxSend>
            </ChatboxComposeContainer>
        </Chatbox>
      ) }
      </AnimatePresence>
    </ChatsWrapper>
  )
}


export default Chats