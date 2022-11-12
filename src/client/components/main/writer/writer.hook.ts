import { trpc } from "@/lib/trpc"
import { StaffProfile } from "@/store/store.types"
import { useRouter } from "next/router"
import { InitialArticle } from "@/store/slices/articles.slice"
import { useState } from "react"


export type Author = Omit<StaffProfile, "bastionId"> & {
  _id: string,
  bio: string
}

export type VisitWriter = {
  author: Author,
  ownedArticles: InitialArticle[]
}

export const useWriter = () =>{
  const router = useRouter()
  const [ authorProfile, setAuthorProfile ] = useState<VisitWriter | undefined>()
  const query = trpc.useQuery(["article.author", {
    username: router.query["username"] as string
  }], {
    onSuccess: ({ data }) =>{
      setAuthorProfile(data as never as VisitWriter)
    }
  })

  return {
    isError: query.isError,
    authorProfile
  }
}