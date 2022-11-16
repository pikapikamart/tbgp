import { trpc } from "@/lib/trpc"
import { InitialArticle } from "@/store/slices/articles.slice"
import { 
  useEffect, 
  useState } from "react"
import { Author } from "@/src/server/controllers/article.controller"
import { BaseArticlePaginateSchema } from "@/src/server/schemas/article.schema"
import { useInView } from "react-intersection-observer"


export type VisitWriter = {
  author: Author,
  ownedArticles: InitialArticle[]
}

type Paginate = {
  id: string,
  paginate?: BaseArticlePaginateSchema
}

export const useWriterArticles = ( id?: string ) => {
  const [ authorArticles, setAuthorArticles ] = useState<InitialArticle[]>([])
  const { ref, inView } = useInView({
    threshold: 1
  })
  const [ paginate, setPaginate ] = useState<Paginate>({ id: "" })
  const query = trpc.useQuery(["article.paginate-author", paginate], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: ({ data }) => {
      setAuthorArticles(prev => prev.concat(data))
    }
  })
  
  useEffect(() =>{
    const length = authorArticles.length

    if ( inView && length && id && authorArticles[length-1]._id!==paginate.paginate?.lastId ) {
      setPaginate(prev => ({
        id,
        paginate: {
          lastId: authorArticles[length-1]._id,
          number: 8
        }
      }))
    }

  }, [ inView ])
  
  useEffect(() =>{
    if ( id ) {
      setPaginate(prev => ({
        ...prev,
        id
      }))
    }
  }, [ id ])

  useEffect(() =>{
    if ( paginate.id ) {
      query.refetch()
    }
  }, [ paginate ])

  return {
    authorArticles,
    ref
  }
}