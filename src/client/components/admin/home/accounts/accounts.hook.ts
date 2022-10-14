import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { addBastionId } from "@/store/slices/admin.slice"
import React, { useEffect } from "react"


export const useBastionIdCreation = () => {
  const mutation = trpc.useMutation(["admin.create-bastionId"])
  const dispatch = useAppDispatch()

  const handleIdCreation = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    const isDisabled = event.currentTarget.getAttribute("aria-disabled")
    
    if ( isDisabled==="true" ) {

      return
    } 

    mutation.mutate()
  }

  useEffect(() => {
    if ( mutation.isSuccess ) {
      dispatch(addBastionId(mutation.data.data))
    }
  }, [ mutation.isSuccess ])
  
  return {
    handleIdCreation
  }
}