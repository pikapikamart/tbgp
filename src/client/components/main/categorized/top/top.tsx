import { useSelectArticles } from "@/lib/hooks/store.hooks"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { useRouter } from "next/router"
import { TopCategorizedArticle } from "./article"
import { 
  TopArticlesList, 
  TopArticlesWrapper } from "./top.styled"


const Top = () =>{
  const router = useRouter()
  const articles = useSelectArticles()

  const renderTopArticles = () =>{
    const topArticles = articles.categorizedArticles.topArticles.map(article => (
      <TopCategorizedArticle
        key={ article.title }
        article={ article } />
    ))

    return topArticles
  }

  return (
    <TopArticlesWrapper>
      <InitArticleMainHeading as='h1'>
        <span>Top { router.query["category"] }</span>
      </InitArticleMainHeading>
      <TopArticlesList>
        { renderTopArticles() }
      </TopArticlesList>
    </TopArticlesWrapper>
  )
}


export default Top