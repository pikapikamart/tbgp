import { useExpansion } from "@/lib/hooks"
import { useRouter } from "next/router"
import { useEffect } from "react"


export const useHeaderControls = () =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const router = useRouter()

  const handleDropdown = () =>{
    handleExpansion()

    isExpanded? document.body.classList.remove("no-scroll") : document.body.classList.add("no-scroll")
  }

  useEffect(() =>{
    if ( isExpanded ) {
      handleDropdown()
    }
  }, [ router.pathname, router.query["query"] ])

  return {
    isExpanded,
    handleExpansion,
    handleDropdown
  }
}