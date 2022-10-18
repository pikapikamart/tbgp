import { useExpansion } from "@/lib/hooks"
import { useRouter } from "next/router"
import { 
  useEffect, 
  useRef } from "react"


export const useHeader = () => {
  const { isExpanded, handleExpansion } = useExpansion()
  const router = useRouter()
  const isMounted = useRef(false)

  useEffect(() =>{
    if ( isMounted && isExpanded ){
      handleExpansion()
    } else {
      isMounted.current = true
    }
  }, [ router.pathname ])

  return {
    isExpanded,
    handleExpansion
  }
}