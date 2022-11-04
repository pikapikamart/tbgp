import { useTrapFocus } from "@/lib/hooks"
import { 
  useAppDispatch,
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"


export const usePublishWriteup = ( exit: () => void ) =>{
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const dispatch = useAppDispatch()

  const handlePublishWriteup = () =>{

  }

  return {
    registerControl,
    registerTrapContainer,
    removeModal: modalContext.removeModal,
    handlePublishWriteup
  }
}