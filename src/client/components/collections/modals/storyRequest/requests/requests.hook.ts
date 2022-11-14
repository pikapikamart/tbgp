import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { updateStoryRequest } from "@/store/slices/staff.slice"
import { useState } from "react"
import { 
  useStoryDispatch, 
  useTrackedStoryRequest } from "../storyRequest.tracked"


export const useAcceptOrRejectRequest = () =>{
  const { storyRequest } = useTrackedStoryRequest()
  const dispatch = useStoryDispatch()
  const appDispatch = useAppDispatch()
  const [ filteredRequests, setFilteredRequests ] = useState(storyRequest?.requests?? [])
  const mutation = trpc.useMutation(["storyRequest.accept-reject"], {
    onSuccess: ({ data }) =>{
      setFilteredRequests(prev => prev.filter(request => request.bastionId!==data.staff.bastionId))
      dispatch({
        type: "ACCEPT_REJECT",
        payload: data
      })
      appDispatch(updateStoryRequest({
        storyRequestId: storyRequest?.storyRequestId?? "",
        username: data.staff.username,
        accept: data.choice
      }))
    }
  })

  const handleRequestChoice = ( choice: boolean, bastionId: string ) =>{
    mutation.mutate({
      choice,
      storyRequestId: storyRequest?.storyRequestId?? "",
      bastionId
    })
  }

  return {
    handleRequestChoice,
    filteredRequests
  }
}