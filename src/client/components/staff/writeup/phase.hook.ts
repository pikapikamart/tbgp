import { isWriteupPhaseEditable } from "@/components/staff/writeup/utils"
import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { StaffState, updateWriteup } from "@/store/slices/staff.slice"
import { 
  addMemberSubmission,
  startCollaborating, 
  stopCollaborating, 
  submitWriteup} from "@/store/slices/writeup.slice"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { Socket } from "socket.io-client"


export const SocketEvents = {
  connection: "connection",
  disconnect: "disconnect",
  clients: {
      create_collab_room: "create_collab_room",
      emit_title: "emit_title",
      emit_caption: "emit_caption",
      emit_slate: "emit_slate",
      emit_previous_slate: "emit_previous_slate",
      send_chat: "send_chat",
      emit_part_submission: "emit_part_submission",
      emit_cancel_part_submission: "emit_cancel_part_submission",
      emit_submit_writeup: "emit_submit_writeup"
  },
  server: {
    broadcast_title: "broadcast_title",
    broadcast_caption: "broadcast_caption",
    broadcast_slate: "broadcast_slate",
    broadcast_request_previous_slate: "broadcast_request_previous_slate",
    broadcast_previous_slate: "broadcast_previous_slate",
    broadcast_previous_chats: "broadcast_previous_chats", 
    broadcast_chat: "broadcast_chat",
    broadcast_part_submission: "broadcast_part_submission",
    broadcast_cancel_part_submission: "broadcast_cancel_part_submission",
    broadcast_submission: "broadcast_submission"
  }
}

export const useWriteupPhaseCollaboration = (socketUri: string) =>{
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() =>{
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

      socket.on(SocketEvents.server.broadcast_submission, ( { date, member }: { date: Date, member: StaffState } ) => {
        dispatch(addMemberSubmission({
          member,
          date
        }))
        dispatch(updateWriteup({
          writeupId: writeup.writeupId,
          members: writeup.request.members.map(({ member }) => member)
        }))
        dispatch(submitWriteup( date ))
      })

      socket.emit(SocketEvents.clients.create_collab_room, {
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