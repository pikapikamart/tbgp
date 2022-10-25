import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { FullStoryRequest } from "@/store/store.types"
import { useRouter } from "next/router"
import { 
  useEffect, 
  useState } from "react"


export const useStoryRequest = ( storyRequestId: string ) =>{
  const [ storyRequest, setStoryRequest ] = useState<FullStoryRequest | null>(null)
  const staff = useSelectStaff()
  const query = trpc.useQuery(["storyRequest.get", { storyRequestId }], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ({ data }) => {
      setStoryRequest(JSON.parse(JSON.stringify(data)))
    }
  })

  useEffect(() =>{
    query.refetch()
  }, [])
  
  return {
    storyRequest,
    bastionId: staff.bastionId,
  }
}

export const useStartStoryRequest = ( storyRequestId: string ) =>{
  const router = useRouter()
  const mutation = trpc.useMutation(["storyRequest.start"], {
    onSuccess: () =>{
      router.reload()
    }
  })

  const handleStartStoryRequest = () => {
    mutation.mutate({ storyRequestId })
  }

  return {
    handleStartStoryRequest
  }
}

export const useApplyStoryRequest = ( storyRequestId: string ) =>{
  const [ hasRequested, setHasRequested ] = useState(false)
  const mutation = trpc.useMutation(["storyRequest.apply"])

  const handleApplyStoryRequest = () => {
    setHasRequested(true)
    mutation.mutate({ storyRequestId })
  }

  return {
    hasApplied: hasRequested,
    handleApplyStoryRequest
  }
}

export const useAcceptOrRejectRequest = ( storyRequest: FullStoryRequest ) =>{
  const [ filteredRequests, setFilteredRequests ] = useState(storyRequest.requests)
  const [ hasRejected, setHasRejected ] = useState(false)
  const [ hasAccepted, setHasAccepted ] = useState(true)
  const mutation = trpc.useMutation(["storyRequest.accept-reject"], {
    onSuccess: ({ data }) =>{
      data.choice? setHasAccepted(true) : setHasRejected(true)
      setFilteredRequests(prev => prev.filter(request => request.bastionId!==data.bastionId))
      // timeout in here for animation something
    }
  })

  const handleRequestChoice = ( choice: boolean, bastionId: string ) =>{
    mutation.mutate({
      choice,
      storyRequestId: storyRequest.storyRequestId,
      bastionId
    })
  }

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