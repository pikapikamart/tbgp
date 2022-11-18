import { useSelectArticles } from "@/lib/hooks/store.hooks"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { TopCategorizedArticle } from "./article"
import { 
  TopArticlesList, 
  TopArticlesWrapper } from "./top.styled"


const Top = () =>{
  const { categorizedArticles } = useSelectArticles()

  const renderTopArticles = () =>{
    const topArticles = categorizedArticles.topArticles.map(article => (
      <TopCategorizedArticle
        key={ article.title }
        article={ article } />
    ))

    return topArticles
  }

  return (
    <TopArticlesWrapper>
      <InitArticleMainHeading as='h1'>
        <span>Top { categorizedArticles.category }</span>
      </InitArticleMainHeading>
      <TopArticlesList>
        { renderTopArticles() }
      </TopArticlesList>
    </TopArticlesWrapper>
  )
}


export default Top