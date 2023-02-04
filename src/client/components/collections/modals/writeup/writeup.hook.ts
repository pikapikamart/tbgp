import { SocketEvents } from "@/components/staff/writeup/phase.hook"
import { useTrapFocus } from "@/lib/hooks"
import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { 
  updateTask, 
  updateWriteup } from "@/store/slices/staff.slice"
import { 
  addMemberSubmission, 
  submitWriteup } from "@/store/slices/writeup.slice"


export const useSubmitWriteup = ( exit: () => void ) => {
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const dispatch = useAppDispatch()
  const writeupPhaseMutation = trpc.useMutation(["writeup.submit-writeupPhase"], {
    onSuccess: ( { data } ) => {
      removeModal()
      dispatch(addMemberSubmission({
        member: staff,
        date: data as Date
      }))

      if ( writeup.content[0].submissions?.length===writeup.request.members.length-1 ) {
        // all members has submitted their part
        dispatch(submitWriteup( data as Date ))
        dispatch(updateWriteup({
          writeupId: writeup.writeupId,
          members: writeup.request.members.map(({ member }) => member)
        }))
        writeup.socket?.emit(SocketEvents.clients.emit_submit_writeup, {
          writeup: writeup.writeupId,
          date: data as Date
        })
      }
     
      writeup.socket?.emit(SocketEvents.clients.emit_part_submission, {
        writeup: writeup.writeupId,
        date: data as Date,
        firstname: staff.firstname,
        lastname: staff.lastname,
        username: staff.username,
        bastionId: staff.bastionId
      })
    }
  })
  const writeupMutation = trpc.useMutation(["writeup.submit"], {
    onSuccess: ({ data }) => {
      dispatch(submitWriteup( data as Date ))
      dispatch(updateTask(writeup.writeupId))
      removeModal()
    }
  })

  const removeModal = () =>{
    modalContext.removeModal()
    exit()
  }

  const handleSubmitWriteup = () =>{
    if ( writeup.currentPhase==="writeup" ) {

      return writeupPhaseMutation.mutate(writeup.writeupId)
    }

    return writeupMutation.mutate(writeup.writeupId)
  }

  return {
    registerControl,
    registerTrapContainer,
    removeModal,
    handleSubmitWriteup
  }
}