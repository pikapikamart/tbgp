import { useTrapFocus } from "@/lib/hooks"
import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { addMemberSubmission } from "@/store/slices/writeup.slice"
import { useRouter } from "next/router"


export const useSubmitCollaborative = ( exit: () => void ) => {
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()
  const router = useRouter()
  const staff = useSelectStaff()
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation(["writeup.submit-writeupPhase"], {
    onSuccess: () => {
      removeModal()
      dispatch(addMemberSubmission(staff))

      if ( writeup.content[0].submissions?.length===writeup.request.members.length-1 ) {
        router.reload()
      }
    }
  })

  const removeModal = () =>{
    modalContext.removeModal()
    exit()
  }

  const handleSubmitWriteup = () =>{
    mutation.mutate(writeup.writeupId)
  }

  return {
    registerControl,
    registerTrapContainer,
    removeModal,
    handleSubmitWriteup
  }
}