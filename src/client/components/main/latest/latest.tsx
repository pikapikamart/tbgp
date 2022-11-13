import { 
  InitArticleCategory, 
  InitArticleMainHeading } from "@/styled/shared/article/initial"
import { MoreArticle } from "../categorized/more/article"
import { MoreArticlesList } from "../categorized/more/more.styled"
import { useLatestArticles } from "./latest.hook"
import { LatestWrapper } from "./latest.styled"


const Articles = () =>{
  const { 
    articles,
    ref } = useLatestArticles()

  const renderLatestArticles = () =>{
    const latestArticles = articles.map(article => (
      <MoreArticle
        key={ article.title }
        article={ article } >
          <InitArticleCategory>
            <span>{ article.category }</span>
          </InitArticleCategory>
      </MoreArticle>
    ))

    return latestArticles
  }

  return (
    <LatestWrapper>
      <InitArticleMainHeading as="h1" >
        <span>Latest Articles</span>
      </InitArticleMainHeading>
      <MoreArticlesList>
        { renderLatestArticles() }
      </MoreArticlesList>
      <div
        ref={ ref } 
        data-usage="pagination" />
    </LatestWrapper>
  )
}


export default Articles