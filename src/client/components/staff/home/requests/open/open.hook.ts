import { 
  useAppDispatch, 
  useSelectOpenStoryRequests } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { setOpenStoryRequests } from "@/store/slices/storyRequests.slice"
import { useEffect } from "react"


export const useOpenStoryRequests = () =>{
  const openStoryRequests = useSelectOpenStoryRequests()
  const dispatch = useAppDispatch()
  const query = trpc.useQuery(["storyRequest.get-multiple"], {
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