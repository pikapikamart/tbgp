import { AuthorArticle } from "@/components/main/writer/article"
import { useWriterArticles } from "@/components/main/writer/writer.hook"
import { 
  ArticleList, 
  ArticlesWrapper } from "./articles.styled"


type ArticlesProps = {
  writerId: string
}

const Articles = ({ writerId }: ArticlesProps) =>{
  const {
    ref,
    authorArticles
  } = useWriterArticles( writerId )

  const renderOwnedArticles = () =>{ 
    const articles = authorArticles.map(article => (
      <AuthorArticle
        key={ article.linkPath }
        article={ article } />
    ))

    return articles
  }

  return (
    <ArticlesWrapper>
      <ArticleList>
        { renderOwnedArticles() }
      </ArticleList>
      <div
        ref={ ref }
        data-usage="paginate" />
    </ArticlesWrapper>
  )
}


export default Articles