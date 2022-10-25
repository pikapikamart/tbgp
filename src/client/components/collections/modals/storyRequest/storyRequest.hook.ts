import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { FullStoryRequest } from "@/store/store.types"
import { useRouter } from "next/router"
import { 
  useEffect, 
  useState } from "react"
import { 
  useStoryDispatch, 
  useTrackedStoryRequest } from "./storyRequest.tracked"


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

export const useStartStoryRequest = ( storyRequestId: string ) =>{
  const router = useRouter()
  const { storyRequest } = useTrackedStoryRequest()
  const mutation = trpc.useMutation(["storyRequest.start"], {
    onSuccess: () =>{
      router.reload()
    }
  })

  const handleStartStoryRequest = () => {
    mutation.mutate({ storyRequestId: storyRequest?.storyRequestId?? "" })
  }

  return {
    handleStartStoryRequest
  }
}

export const useApplyStoryRequest = () =>{
  const { storyRequest } = useTrackedStoryRequest()
  const dispatch = useStoryDispatch()
  const mutation = trpc.useMutation(["storyRequest.apply"], {
    onSuccess: () =>{
      dispatch({ type: "APPLY" })
    }
  })

  const handleApplyStoryRequest = () => {
    mutation.mutate({ storyRequestId: storyRequest?.storyRequestId?? "" })
  }

  return {
    handleApplyStoryRequest
  }
}

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