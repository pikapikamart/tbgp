import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { simpleFadeVariant } from "@/src/client/motion"
import { 
  ChatboxWrapper, 
  ChatMessage, 
  ChatOwner, 
  ChatsContainer, 
  SingleChat } from "./chatbox.styled"


export type Chat = {
  member: {
    firstname: string,
    lastname: string,
    username: string
  },
  message: string
}

export type ChatboxProps = {
  chats: Chat[],
  chatsContainer: React.MutableRefObject<HTMLDivElement | null>,
  children: React.ReactNode
}

const Chatbox = ({ chats, chatsContainer, children }: ChatboxProps) =>{
  const staff = useSelectStaff()

  const renderCurrentChats = () =>{
    const currentChats = chats.map((chat, index) => (
      <SingleChat 
        key={ chat.message + index }
        $owned={ chat.member.username===staff.username }
        $start={ index!==chats.length-1 && 
          chats[index-1]?.member.username!==chat.member.username &&
          chats[index+1].member.username===chat.member.username }
        $middle={ index!==chats.length-1 && 
            index!==0 && 
            chats[index-1].member.username===chat.member.username &&
            chats[index+1].member.username===chat.member.username }
        $end={ index!==0 && 
          chats[index+1]?.member.username!==chat.member.username &&
          chats[index-1].member.username===chat.member.username  }>
          <ChatOwner>{`${ chat.member.firstname } ${ chat.member.lastname }`}</ChatOwner>
          <ChatMessage>{ chat.message }</ChatMessage>
      </SingleChat>
    ))

    return currentChats
  }

  return (
    <ChatboxWrapper
      initial="initial"
      animate="animate"
      exit="exit"
      variants={ simpleFadeVariant }>
        <ChatsContainer ref={ chatsContainer }>
          { renderCurrentChats() }
        </ChatsContainer>
        { children }
    </ChatboxWrapper>
  )
}


export default Chatbox