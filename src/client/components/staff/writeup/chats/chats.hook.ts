import { useExpansion } from "@/lib/hooks"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { Events } from "@/pages/storybuilder/writeup/[writeup]/phase.hook"
import React, { 
  useEffect, 
  useRef, 
  useState } from "react"
import { Chat } from "./chatbox/chatbox"


export const useChats = () =>{
  const { isExpanded,handleExpansion } = useExpansion()
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()
  const [ currentChats, setCurrentChats ] = useState<Chat[]>([])
  const [ viewedChatsLength, setViewedChatsLength ] = useState(0)
  const chatRef = useRef<HTMLTextAreaElement | null>(null)

  const handleTextareaResize = ( { currentTarget }: React.FormEvent<HTMLTextAreaElement> ) => {
    currentTarget.style.height = "0"
    currentTarget.style.height = currentTarget.scrollHeight + "px"
  }

  const handleSendChat = () =>{
    if ( writeup.socket && chatRef.current && chatRef.current.value ) {
      const chat: Chat = {
        member: {
          firstname: staff.firstname,
          lastname: staff.lastname,
          username: staff.username
        },
        message: chatRef.current.value
      }
      setCurrentChats(prev => prev.concat([chat]))
      writeup.socket.emit(Events.clients.send_chat, chat)
      chatRef.current.value = ""
    }
  }

  const handleChatKeydown = ( event: React.KeyboardEvent ) => {
    const key = event.key

    if ( key==="Enter" && !event.shiftKey ) {
      handleSendChat()
    }
  }

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
  }, [])

  return {
    isExpanded,
    handleExpansion,
    handleTextareaResize,
    currentChats,
    chatRef,
    handleSendChat,
    handleChatKeydown
  }
}