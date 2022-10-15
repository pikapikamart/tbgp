import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { addBastionId } from "@/store/slices/admin.slice"


export const useBastionIdCreation = () => {
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation(["admin.create-bastionId"], {
    onSuccess: ( data ) => {
      dispatch(addBastionId(data.data))
    }
  })

  const handleIdCreation = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    const isDisabled = event.currentTarget.getAttribute("aria-disabled")
    
    if ( isDisabled==="true" ) {

      return
    } 

    mutation.mutate()
  }
  
  return {
    handleIdCreation
  }
}