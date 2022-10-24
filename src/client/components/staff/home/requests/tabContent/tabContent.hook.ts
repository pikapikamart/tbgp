import { trpc } from "@/lib/trpc"
import { StoryRequestTabSchema } from "@/src/server/schemas/story.request.schema"
import { InitialStoryRequest } from "@/store/store.types"
import { useEffect } from "react"
import { useRouter } from "next/router"


export const useInitialStoryRequests = ( tab: StoryRequestTabSchema ) =>{
  const router = useRouter()
  const query = trpc.useQuery(["storyRequest.get-multiple", tab], {
    refetchOnWindowFocus: false,
    enabled: false,
  })

  useEffect(() =>{
    if ( router.query["tab"]===tab || ( !router.query["tab"] && !tab ) ){
      query.refetch()
    }
  }, [ router.query ])

  return query.isSuccess? JSON.parse(JSON.stringify(query.data.data)) as InitialStoryRequest[] : []
}