import { 
  useAppDispatch, 
  useSelectOpenStoryRequests } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { StoryRequestTabSchema } from "@/src/server/schemas/story.request.schema"
import { setOpenStoryRequests } from "@/store/slices/storyRequests.slice"
import { useEffect } from "react"


export const useOpenStoryRequests = ( tab: StoryRequestTabSchema ) =>{
  const openStoryRequests = useSelectOpenStoryRequests()
  const dispatch = useAppDispatch()
  const query = trpc.useQuery(["storyRequest.get-multiple", tab], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ({ data }) =>{
      dispatch(setOpenStoryRequests(JSON.parse(JSON.stringify(data))))
    }
  })

  useEffect(() =>{
    query.refetch()
  }, [])

  return openStoryRequests 
}