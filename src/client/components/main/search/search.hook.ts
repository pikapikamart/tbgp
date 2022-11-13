import { trpc } from "@/lib/trpc"
import { BaseArticlePaginateSchema } from "@/src/server/schemas/article.schema"
import { InitialArticle } from "@/store/slices/articles.slice"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"


type QueryInput = {
  query: string,
  paginate?: BaseArticlePaginateSchema
}

export const useSearch = () => {
  const router = useRouter()
  const [ searchArticles, setSearchArticles ] = useState<InitialArticle[]>([])
  const [ queryInput, setQueryInput ] = useState<QueryInput>({
    query: router.query["query"] as string,
  })
  trpc.useQuery(["article.search", queryInput], {
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setSearchArticles(prev => prev.concat(data))
    }
  })
  const { ref, inView } = useInView({
    threshold: 1
  })

  useEffect(() =>{
    const length = searchArticles.length

    if ( inView && length && queryInput.paginate?.lastId!==searchArticles[length-1]._id ) {
      setQueryInput(prev => ({
        ...prev,
        paginate: {
          lastId: searchArticles[length-1]._id,
          number: 8
        }
      }))
    }
  }, [ inView ])

  useEffect(() =>{
    setQueryInput({ query: router.query["query"] as string })
    setSearchArticles([])
  }, [ router.query["query"] ])

  return {
    query: router.query["query"] as string,
    articles: searchArticles,
    ref
  }
}