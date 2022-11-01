import { useTrapFocus } from "@/lib/hooks"
import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup} from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { addWriteupTask } from "@/store/slices/staff.slice"
import { takeWriteupTask } from "@/store/slices/writeup.slice"


export const useTakeTask = ( exit: () => void ) =>{
  const modalContext = useModalContext()
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation(["writeup.take-task"], {
    onSuccess: () =>{
      dispatch(takeWriteupTask(staff))
      dispatch(addWriteupTask(writeup))
    }
  })

  const removeModal = () => {
    modalContext.removeModal()
    exit()
  }

  const handleTakeTask = () =>{
    mutation.mutate(writeup.writeupId)
  }

  return {
    registerControl,
    registerTrapContainer,
    removeModal,
    handleTakeTask
  }
}