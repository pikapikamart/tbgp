import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { setAdmin } from "@/store/slices/admin.slice"
import { useEffect } from "react"


export const useSetupAdmin = () =>{
  const query = trpc.useQuery(["admin.get-profile"], {
    refetchOnWindowFocus: false,
    enabled: false
  })
  const dispatch = useAppDispatch()

  useEffect(() =>{
    if ( query.isSuccess ) {
      dispatch(setAdmin(query.data.data))
    }
  }, [ query.isSuccess ])

  useEffect(() =>{
    query.refetch()
  }, [])
}