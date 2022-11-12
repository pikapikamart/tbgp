import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { InitialArticle } from "@/store/slices/articles.slice"
import { InitArticleCaption } from "@/styled/shared/article/initial"
import { 
  ArticleImage, 
  ArticleTextContainer, 
  ArticleTitle, 
  ArticleWrapper } from "./article.styled"
import Link from "next/link"


type ArticleProps = {
  article: InitialArticle,
  children?: React.ReactNode
}

const Article = ({ article, children }: ArticleProps) =>{

  return (
    <ArticleWrapper>
      <ArticleImage
        src={ article.thumbnail.small }
        alt=""/>
      <ArticleTextContainer>
        { children }
        <ArticleTitle>
          <Link 
            href={ `/${ article.linkPath }` }
            passHref>
            <a>{ article.title }</a>
          </Link>
        </ArticleTitle>
        <InitArticleCaption>{ article.caption }</InitArticleCaption>
        <ArticleAuthors authors={ article.authors }>
          <ArticleDate date={ article.createdAt } />
        </ArticleAuthors>
      </ArticleTextContainer>
    </ArticleWrapper>
  )
}


export default Article