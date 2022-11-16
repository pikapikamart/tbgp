import { useTrapFocus } from "@/lib/hooks"
import { 
  useAppDispatch,
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useModalContext } from "@/store/context/modal/modal"
import { publishWriteup } from "@/store/slices/staff.slice"
import { useState } from "react"


export const usePublishWriteup = ( exit: () => void ) =>{
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()
  const dispatch = useAppDispatch()
  const [ errorMessage, setErrorMessage ] = useState({
    message: "",
    code: ""
  })
  const mutation = trpc.useMutation(["writeup.publish"], {
    onSuccess: () => {
      dispatch(publishWriteup(writeup.writeupId))
      
    },
    onError: ( error ) => {
      setErrorMessage({
        message: error.message,
        code: error.data?.code?? ""
      })
    }
  })

  const removeModal = () =>{
    modalContext.removeModal()
    exit()
  }

  const handlePublishWriteup = () =>{
    mutation.mutate(writeup.writeupId)
  }

  return {
    registerControl,
    registerTrapContainer,
    removeModal,
    handlePublishWriteup,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage
  }
}