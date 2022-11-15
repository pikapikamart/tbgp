import { isWriteupPhaseEditable } from "@/components/staff/writeup/utils"
import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { startCollaborating, stopCollaborating } from "@/store/slices/writeup.slice"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { Socket } from "socket.io-client"


export const Events = {
  connection: "connection",
  disconnect: "disconnect",
  clients: {
      create_collab_room: "create_collab_room",
      emit_title: "emit_title",
      emit_caption: "emit_caption",
      emit_slate: "emit_slate"
  },
  server: {
    broadcast_title: "broadcast_title",
    broadcast_caption: "broadcast_caption",
    broadcast_slate: "broadcast_slate" 
  }
}

export const useWriteupPhaseCollaboration = (socketUri: string) =>{
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() =>{
    // only send a socket when there are atleast 2 members
    // in an available writeup
    if ( writeup.writeupId && 
        !writeup.socket &&
        writeup.content[0].phase==="writeup" && 
        isWriteupPhaseEditable(writeup, staff.bastionId) && 
        writeup.request.members.length > 1 ) {
      dispatch(startCollaborating(socketUri))
    }
  }, [ writeup ])

  useEffect(() =>{
    if ( writeup.socket ) {

      if ( !socketRef.current ) {
        socketRef.current = writeup.socket
      }

      const socket = writeup.socket

      socket.emit(Events.clients.create_collab_room, {
        writeup: writeup.writeupId,
        firstname: staff.firstname,
        lastname: staff.lastname
      })
    }
  }, [ writeup.socket ])

  useEffect(() =>{
    if ( router.query["phase"] !=="writeup" && writeup.socket ) {
      socketRef.current?.close()
    }

  }, [ router.query["phase"] ])

  useEffect(() =>{

    return () => {
      dispatch(stopCollaborating())
      socketRef.current?.close()
    }
  }, [])
} 