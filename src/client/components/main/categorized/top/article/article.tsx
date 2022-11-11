import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { InitialArticle } from "@/store/slices/articles.slice"
import { InitArticleCaption } from "@/styled/shared/article/initial"
import Link from "next/link"
import { 
  ArticleWrapper,
  ArticleTitle,
  ArticleContentContainer, 
  ArticleImage } from "./article.styled"


type ArticleProps = {
  article: InitialArticle,
}

const Article = ({ article }: ArticleProps) =>{

  return (
    <ArticleWrapper>
      <ArticleContentContainer>
        <ArticleTitle>
          <Link
            href={ `/${ article.linkPath }` }
            passHref>
              <a>{article.title}</a>
          </Link>
        </ArticleTitle>
        <ArticleAuthors authors={ article.authors }>
          <ArticleDate date={ article.createdAt } />
        </ArticleAuthors>
        <InitArticleCaption>{ article.caption }</InitArticleCaption>
      </ArticleContentContainer>
      <ArticleImage 
        src={ article.thumbnail.medium!==""? article.thumbnail.medium : article.thumbnail.small }
        alt="" />
    </ArticleWrapper>
  )
}


export default Article