import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { 
  MoreArticlesList, 
  MoreArticlesWrapper } from "../categorized/more/more.styled"


const Articles = () =>{
  const articles = []

  const renderLatestArticles = () =>{

  }

  return (
    <MoreArticlesWrapper>
      <InitArticleMainHeading alignment="left">
        <span>Latest Articles</span>
      </InitArticleMainHeading>
      <MoreArticlesList>

      </MoreArticlesList>
    </MoreArticlesWrapper>
  )
}


export default Articles