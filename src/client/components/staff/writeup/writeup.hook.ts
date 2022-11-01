import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { resetWriteup } from "@/store/slices/writeup.slice"
import { useEffect } from "react"


export const useWriteup = () =>{
  const dispatch = useAppDispatch()
  const modalContext = useModalContext()

  useEffect(() =>{

    return () => {
      dispatch(resetWriteup())
    }
  }, [])

  return {
    focusBackElement: modalContext.focusBackElement
  }
}