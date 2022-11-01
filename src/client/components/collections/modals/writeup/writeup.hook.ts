import { useTrapFocus } from "@/lib/hooks"
import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { addMemberSubmission } from "@/store/slices/writeup.slice"
import { useRouter } from "next/router"


export const useSubmitWriteup = ( exit: () => void, isWriteupPhase: boolean = true ) => {
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()
  const router = useRouter()
  const staff = useSelectStaff()
  const dispatch = useAppDispatch()
  const writeupPhaseMutation = trpc.useMutation(["writeup.submit-writeupPhase"], {
    onSuccess: () => {
      removeModal()
      dispatch(addMemberSubmission(staff))

      if ( writeup.content[0].submissions?.length===writeup.request.members.length-1 ) {
        router.reload()
      }
    }
  })
  const writeupMutation = trpc.useMutation(["writeup.submit"], {
    onSuccess: () => {
      router.reload()
    }
  })

  const removeModal = () =>{
    modalContext.removeModal()
    exit()
  }

  const handleSubmitWriteup = () =>{
    if ( isWriteupPhase ) {
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