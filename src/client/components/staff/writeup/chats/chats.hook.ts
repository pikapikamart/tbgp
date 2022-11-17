import { useExpansion } from "@/lib/hooks"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { Events } from "@/components/staff/writeup/phase.hook"
import React, { 
  useEffect, 
  useRef, 
  useState } from "react"
import { Chat } from "./chatbox/chatbox"


type ChatWithWriteup = Chat & {
  writeup: string
}

export const useChats = () =>{
  const { isExpanded,handleExpansion } = useExpansion()
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()
  const [ currentChats, setCurrentChats ] = useState<Chat[]>([])
  const [ viewedChatsLength, setViewedChatsLength ] = useState(0)
  const [ isMobileView, setIsMobileView ] = useState(false)
  const chatRef = useRef<HTMLTextAreaElement | null>(null)
  const chatsContainer = useRef<HTMLDivElement | null>(null)

  const handleTextareaResize = ( { currentTarget }: React.FormEvent<HTMLTextAreaElement> ) => {
    currentTarget.style.height = "0"
    currentTarget.style.height = currentTarget.scrollHeight + "px"
  }

  const handleSendChat = () =>{
    if ( writeup.socket && chatRef.current && chatRef.current.value ) {
      const chat: ChatWithWriteup = {
        member: {
          firstname: staff.firstname,
          lastname: staff.lastname,
          username: staff.username
        },
        message: chatRef.current.value,
        writeup: writeup.writeupId
      }
      setCurrentChats(prev => prev.concat([chat]))
      writeup.socket.emit(Events.clients.send_chat, chat)
      chatRef.current.value = ""
      chatRef.current.setAttribute("style", "height:40px")
      chatRef.current.focus()
    }
  }

  const handleChatKeydown = ( event: React.KeyboardEvent ) => {
    const key = event.key
   
    if ( key==="Enter" && !event.shiftKey && !isMobileView ) {
      handleSendChat()
      event.preventDefault()
    }
  }

  useEffect(() =>{
    if ( chatsContainer.current ) {
      chatsContainer.current.scrollTo({
        top: 1000,
        behavior: "smooth"
      })
    }
  }, [ currentChats ])

  useEffect(() =>{
    const socket = writeup.socket
 
    if ( socket ) {
      socket.on(Events.server.broadcast_previous_chats, ( chats: Chat[] ) => {
        setCurrentChats(chats)
      })

      socket.on(Events.server.broadcast_chat, ( chat: Chat ) => {
        setCurrentChats(prev => prev.concat([chat]))
      })
    }
  }, [ writeup.socket ])

  useEffect(() =>{
    if ( !isExpanded ) {
      setViewedChatsLength(currentChats.length)
    } else {
      chatRef.current?.setAttribute("style", "height:40px")
    }
  }, [ isExpanded ])

  useEffect(() =>{
    const handleResize = () => changeState()

    const changeState = () =>{

      if ( window.innerWidth >= 1000 ) {
        setIsMobileView(false)
      } else if ( window.innerWidth <= 999 ) {
        setIsMobileView(true)
      }
    }

    changeState()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return {
    isExpanded,
    handleExpansion,
    handleTextareaResize,
    currentChats,
    chatRef,
    chatsContainer,
    viewedChatsLength,
    handleSendChat,
    handleChatKeydown
  }
}