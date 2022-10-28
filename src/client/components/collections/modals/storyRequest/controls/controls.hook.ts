import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { addStoryRequestApplication } from "@/store/slices/staff.slice"
import { useRouter } from "next/router"
import { 
  useStoryDispatch, 
  useTrackedStoryRequest } from "../storyRequest.tracked"


export const useApplyStoryRequest = () =>{
  const { storyRequest } = useTrackedStoryRequest()
  const storyDispatch = useStoryDispatch()
  const appDispatch = useAppDispatch()
  const mutation = trpc.useMutation(["storyRequest.apply"], {
    onSuccess: ({ data }) =>{
      storyDispatch({ type: "APPLY" })
      appDispatch(addStoryRequestApplication(data))
    }
  })

  const handleApplyStoryRequest = () => {
    mutation.mutate({ storyRequestId: storyRequest?.storyRequestId?? "" })
  }

  return {
    handleApplyStoryRequest
  }
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