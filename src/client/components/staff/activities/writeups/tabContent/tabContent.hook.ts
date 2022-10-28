import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { WriteupPhases } from "@/src/server/models/writeup.model";
import { useRouter } from "next/router";


export const useInitialWriteups = ( tab: WriteupPhases ) =>{
  const router = useRouter()
  const query = trpc.useQuery(["writeup.get-multiple", tab], {
    refetchOnWindowFocus: false,
    enabled: false
  })

  useEffect(() =>{
    if ( router.query["tab"]===tab || ( !router.query["tab"] && tab==="writeup" ) ) {
      query.refetch()
    }

  }, [ router.query ])

  return query.isSuccess? query.data.data : []
}