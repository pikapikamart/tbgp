import { trpc } from "@/lib/trpc"
import { StaffProfile } from "@/store/store.types"
import { useRouter } from "next/router"
import { InitialArticle } from "@/store/slices/articles.slice"
import { useEffect, useState } from "react"
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

export const useWriter = () =>{
  const router = useRouter()
  const [ author, setAuthor ] = useState<Author | null>(null)
  const [ authorArticles, setAuthorArticles ] = useState<InitialArticle[]>([])
  const authorQuery = trpc.useQuery(["article.author", { username: router.query["username"] as string}], {
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) =>{
      setAuthor(data)
    }
  })
  const { ref, inView } = useInView({
    threshold: 1
  })
  const [ paginate, setPaginate ] = useState<Paginate>({
    id: author?._id?? "a"
  })
  trpc.useQuery(["article.paginate-author", paginate], {
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setAuthorArticles(prev => prev.concat(data))
    }
  })
  
  useEffect(() =>{
    const length = authorArticles.length

    if ( inView && length && author && authorArticles[length-1]._id!==paginate.paginate?.lastId ) {
      setPaginate(prev => ({
        id: author._id,
        paginate: {
          lastId: authorArticles[length-1]._id,
          number: 2
        }
      }))
    }

  }, [ inView ])

  return {
    isError: authorQuery.isError,
    author,
    authorArticles,
    ref
  }
}