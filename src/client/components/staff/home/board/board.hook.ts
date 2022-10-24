import { useExpansion } from "@/lib/hooks"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { isEditorStaffState } from "@/store/slices/staff.slice"
import { useRouter } from "next/router"
import { useEffect } from "react"


export const useBoard = () =>{
  const router = useRouter()
  const { isExpanded, handleExpansion } = useExpansion()
  const staff = useSelectStaff()

  useEffect(() =>{
    if ( !isEditorStaffState(staff) && router.query["tab"]==="created") {
      router.replace("/storybuilder")
    }
  }, [ router.query ])

  return {
    isExpanded,
    handleExpansion,
    staff,
    params: router.query["tab"] as string
  }
}