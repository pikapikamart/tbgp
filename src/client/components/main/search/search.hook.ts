import { trpc } from "@/lib/trpc"
import { InitialArticle } from "@/store/slices/articles.slice"
import { useRouter } from "next/router"


export const useSearch = () => {
  const router = useRouter()
  const query = trpc.useQuery(["article.search", {
    query: (router.query["query"] as string).trim(),
  }])

  return {
    query: router.query["query"] as string,
    articles: ((query.data?.data?? []) as never) as InitialArticle[]
  }
}