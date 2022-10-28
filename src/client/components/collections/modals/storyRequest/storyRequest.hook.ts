import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { useRouter } from "next/router"
import { 
  useEffect, 
  useState } from "react"
import { useStoryDispatch } from "./storyRequest.tracked"


export const useStoryRequest = ( storyRequestId: string ) =>{
  const dispatch = useStoryDispatch()
  const staff = useSelectStaff()
  const query = trpc.useQuery(["storyRequest.get", { storyRequestId }], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ({ data }) => {
      dispatch({
        type: "SET_STORYREQUEST",
        payload: {
          storyRequest: JSON.parse(JSON.stringify(data)),
          staff
        }
      })
    }
  })

  useEffect(() =>{
    query.refetch()
  }, [])
}

export const useDeleteStoryRequest = ( storyRequestId: string ) =>{
  const router = useRouter()
  const [ isDeleting, setIsDeleting ] = useState(false)
  const mutation = trpc.useMutation(["storyRequest.delete"], {
    onSuccess: () =>{
      router.reload()
    }
  })

  const handleDeleteStoryRequest = () =>{
    setIsDeleting(prev => !prev)
  }

  const handleConfirmDeleteStoryRequest = () =>{
    mutation.mutate({ storyRequestId })
  }

  return {
    isDeleting,
    handleDeleteStoryRequest,
    handleConfirmDeleteStoryRequest
  }
}