import { trpc } from "@/lib/trpc"
import { 
  useEffect, 
  useState } from "react"
import { 
  useStoryDispatch, 
  useTrackedStoryRequest } from "../storyRequest.tracked"


export const useAcceptOrRejectRequest = () =>{
  const { storyRequest } = useTrackedStoryRequest()
  const dispatch = useStoryDispatch()
  const [ filteredRequests, setFilteredRequests ] = useState(storyRequest?.requests?? [])
  const [ hasRejected, setHasRejected ] = useState(false)
  const [ hasAccepted, setHasAccepted ] = useState(true)
  const mutation = trpc.useMutation(["storyRequest.accept-reject"], {
    onSuccess: ({ data }) =>{
      data.choice? setHasAccepted(true) : setHasRejected(true)
      setFilteredRequests(prev => prev.filter(request => request.bastionId!==data.staff.bastionId))
      dispatch({
        type: "ACCEPT_REJECT",
        payload: data
      })
    }
  })

  const handleRequestChoice = ( choice: boolean, bastionId: string ) =>{
    mutation.mutate({
      choice,
      storyRequestId: storyRequest?.storyRequestId?? "",
      bastionId
    })
  }

  useEffect(() =>{
    if ( hasRejected || hasAccepted ) {

      const timeout = setTimeout(() =>{
        setHasRejected(false)
        setHasAccepted(false)
      }, 2000)

      return () => clearTimeout(timeout) 
    }
  }, [ hasRejected, hasAccepted ])

  return {
    handleRequestChoice,
    hasRejected,
    hasAccepted,
    filteredRequests
  }
}