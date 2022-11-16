import { 
  useEffect, 
  useRef } from "react"


export const useWriteupVersion = () =>{
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() =>{
    const timeout = setTimeout(() =>{
      modalRef.current?.setAttribute("style", "")
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  return {
    modalRef
  }
}