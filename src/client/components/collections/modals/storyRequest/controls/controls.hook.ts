import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { 
  addStoryRequestApplication, 
  startStoryRequest } from "@/store/slices/staff.slice"
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

export const useStartStoryRequest = () =>{
  const router = useRouter()
  const { storyRequest } = useTrackedStoryRequest()
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation(["storyRequest.start"], {
    onSuccess: () =>{
      dispatch(startStoryRequest(storyRequest?.storyRequestId?? ""))
      router.replace("/storybuilder/activities?tab=writeup")
    }
  })

  const handleStartStoryRequest = () => {
    mutation.mutate({ storyRequestId: storyRequest?.storyRequestId?? "" })
  }

  return {
    handleStartStoryRequest
  }
}