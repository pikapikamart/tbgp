import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { InitialArticle } from "@/store/slices/articles.slice"
import { InitArticleCaption } from "@/styled/shared/article/initial"
import Link from "next/link"
import { 
  ArticleImage,
  ArticleTextContainer,
  ArticleTitle,
  ArticleWrapper,
 } from "./article.styled"


type ArticleProps = {
  article: InitialArticle
}

const Article = ({ article }: ArticleProps) => {

  return (
    <ArticleWrapper>
      <ArticleTextContainer>
        <Link 
          href={ `/${ article.linkPath }` }
          passHref>
          <a>
            <ArticleTitle>{ article.title }</ArticleTitle>
          </a>
        </Link>
        <InitArticleCaption>{ article.caption }</InitArticleCaption>
        <ArticleAuthors authors={ article.authors }>
          <ArticleDate date={ article.createdAt } />
        </ArticleAuthors>
      </ArticleTextContainer>
      <ArticleImage
        src={ article.thumbnail.small }
        alt="" />
    </ArticleWrapper>
  )
}


export default Article