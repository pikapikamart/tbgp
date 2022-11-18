import { useSelectArticles } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { InitialArticle } from "@/store/slices/articles.slice"
import { useRouter } from "next/router"
import { 
  useEffect, 
  useState } from "react"
import { useInView } from "react-intersection-observer"


export const useMoreCategorized = () =>{
  const { categorizedArticles } = useSelectArticles()
  const [ moreArticles, setMoreArticles ] = useState<InitialArticle[]>([]) 
  const router = useRouter()
  const { inView, ref } = useInView({
    threshold: 1
  })
  const [ paginate, setPaginate ] = useState({
    lastId: "",
    number: 8
  })
  const query = trpc.useQuery(["article.category", {
    category: router.query["category"] as string,
    paginate
  }], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ({ data }) =>{
      setMoreArticles(prev => prev.concat(data))
    }
  })

  useEffect(() =>{
    setMoreArticles(categorizedArticles.moreArticles)
  }, [ categorizedArticles ])

  useEffect(() =>{
    if ( paginate.lastId ) {
      query.refetch()
    }
  }, [ paginate.lastId ])

  useEffect(() =>{
    const length = moreArticles.length

    if ( inView && length && moreArticles[length-1]._id !== paginate.lastId ) {
      setPaginate(prev => ({
        ...prev,
        lastId: moreArticles[length-1]._id
      }))
    }
  }, [ inView ])


  return {
    articles: moreArticles,
    category: categorizedArticles.category,
    ref,
  }
}