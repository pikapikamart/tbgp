import { useSelectArticles } from "@/lib/hooks/store.hooks"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { useRouter } from "next/router"
import { MoreArticle } from "./article"
import { 
  MoreArticlesList, 
  MoreArticlesWrapper } from "./more.styled"


const More = () =>{
  const articles = useSelectArticles()
  const router = useRouter()

  const renderMoreArticles = () =>{
    const moreArticles = articles.categorizedArticles.moreArticles.map(article => (
      <MoreArticle
        key={ article.title } 
        article={ article } />
    ))

    return moreArticles
  }

  return (
    <MoreArticlesWrapper>
      <InitArticleMainHeading alignment="left">
        <span>More from { router.query["category"] }</span>
      </InitArticleMainHeading>
      <MoreArticlesList>
        { renderMoreArticles() }
      </MoreArticlesList>
    </MoreArticlesWrapper>
  )
}


export default More