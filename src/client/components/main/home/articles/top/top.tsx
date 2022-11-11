import { VerticalArticle } from "@/components/shared/article/vertical"
import { useSelectArticles } from "@/lib/hooks/store.hooks"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { 
  TopArticlesList, 
  TopArticlesWrapper } from "./top.styled"


const Top = () =>{
  const articles = useSelectArticles()

  const renderTopArticles = () =>{
    const topArticles = articles.topArticles.map((article, index) => (
      <VerticalArticle
        key={ article.title + index }
        article={ article }
        titleFormat={ index <= 1? "one" : index===2? "two": "three" }
        hideCaption={ index>2 }
        hideImage={ index>2 }
        thumbnail="medium"
        shouldReverse={ index<=2 } />
    ))

    return topArticles
  }

  return (
    <TopArticlesWrapper>
      <InitArticleMainHeading>
        <span>Top News</span>
      </InitArticleMainHeading>
      <TopArticlesList>{ renderTopArticles() }</TopArticlesList>
    </TopArticlesWrapper>
  )
}


export default Top