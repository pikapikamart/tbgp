import { trpc } from "@/lib/trpc"
import { InitialArticle } from "@/store/slices/articles.slice"
import { 
  useEffect, 
  useState } from "react"
import { useInView } from "react-intersection-observer"


export const useLatestArticles = () => {
  const [ latestArticles, setLatestArticles ] = useState<InitialArticle[]>([])
  const [ paginate, setPaginate ] = useState({
    lastId: "",
    number: 8
  })
  const { ref, inView } = useInView({
    threshold: 1
  })
  trpc.useQuery(["article.latest", paginate], {
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setLatestArticles(prev => prev.concat(data))
    }
  })

  useEffect(() =>{
    const length = latestArticles.length

    if ( inView && length && latestArticles[length-1]._id!==paginate.lastId ) {
      setPaginate(prev => ({
        ...prev,
        lastId: latestArticles[length-1]._id
      }))
    }
  }, [ inView ])

  return {
    articles: latestArticles,
    ref
  }
}