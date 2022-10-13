import { 
  useRef,
  useEffect } from "react"


export const useFocusModal = () =>{
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() =>{ 
    if ( modalRef.current ) {
      modalRef.current.focus()
    }
  }, [])

  return {
    modalRef
  }
}
