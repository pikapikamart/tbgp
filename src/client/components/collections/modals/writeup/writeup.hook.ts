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
    onSuccess: () => {
      removeModal()
      dispatch(addMemberSubmission(staff))

      if ( writeup.content[0].submissions?.length===writeup.request.members.length-1 ) {
        dispatch(submitWriteup())
        dispatch(updateWriteup({
          writeupId: writeup.writeupId,
          members: writeup.request.members
        }))
      }
    }
  })
  const writeupMutation = trpc.useMutation(["writeup.submit"], {
    onSuccess: () => {
      dispatch(submitWriteup())
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