import { SocketEvents } from "@/components/staff/writeup/phase.hook"
import { useTrapFocus } from "@/lib/hooks"
import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { removeMemberSubmission } from "@/store/slices/writeup.slice"


export const useCancelCollaborative = ( exit: () => void ) => {
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation(["writeup.cancel-writeupSubmission"], {
    onSuccess: () => {
      removeModal()
      dispatch(removeMemberSubmission(staff.bastionId))
    }
  })

  const removeModal = () =>{
    modalContext.removeModal()
    exit()
  }

  const handleCancelSubmission = () =>{
    writeup.socket?.emit(SocketEvents.clients.emit_cancel_part_submission, {
      writeup: writeup.writeupId,
      bastionId: staff.bastionId
    })
    mutation.mutate(writeup.writeupId)
  }

  return {
    registerControl,
    registerTrapContainer,
    removeModal,
    handleCancelSubmission
  }
}