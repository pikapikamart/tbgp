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

  useEffect(() =>{
    document.body.classList.add("no-scroll")

    return () => document.body.classList.remove("no-scroll")
  }, [])

  return {
    modalRef
  }
}
