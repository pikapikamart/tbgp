import { trpc } from "@/lib/trpc"
import { InitialArticle } from "@/store/slices/articles.slice"
import { useState } from "react"


export const useLatestArticles = () => {
  const [ paginate, setPaginate ] = useState({
    lastId: "",
    number: 0
  })
  const query = trpc.useQuery(["article.latest"])

  return {
    articles: (query.data?.data?? []) as never as InitialArticle[]
  }
}