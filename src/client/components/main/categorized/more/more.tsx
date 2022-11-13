import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { MoreArticle } from "./article"
import { useMoreCategorized } from "./more.hook"
import { 
  MoreArticlesList, 
  MoreArticlesWrapper } from "./more.styled"


const More = () =>{
  const {
    articles,
    category,
    ref
  } = useMoreCategorized()

  const renderMoreArticles = () =>{
    const moreArticles = articles.map(article => (
      <MoreArticle
        key={ article.title } 
        article={ article } />
    ))

    return moreArticles
  }

  return (
    <MoreArticlesWrapper>
      <InitArticleMainHeading alignment="left">
        <span>More from { category }</span>
      </InitArticleMainHeading>
      <MoreArticlesList>
        { renderMoreArticles() }
      </MoreArticlesList>
      <div
        ref={ ref }
        data-usage="paginate" />
    </MoreArticlesWrapper>
  )
}


export default More