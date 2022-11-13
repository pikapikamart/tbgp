import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { InitialArticle } from "@/store/slices/articles.slice"
import { InitArticleCaption } from "@/styled/shared/article/initial"
import Link from "next/link"
import { 
  Article as StyledArticle,
  ArticleImage,
  ArticleTextContainer,
  ArticleTitle,
 } from "../writer.styled"


type ArticleProps = {
  article: InitialArticle
}

const Article = ({ article }: ArticleProps) =>{

  return (
    <StyledArticle>
      <ArticleTextContainer>
        <ArticleTitle>
          <Link
            href={`/${ article.linkPath }`}
            passHref>
            <a>{ article.title }</a>
          </Link>
        </ArticleTitle>
        <InitArticleCaption>{ article.caption }</InitArticleCaption>
        <ArticleAuthors authors={ article.authors }>
          <ArticleDate date={ article.createdAt } />
        </ArticleAuthors>
      </ArticleTextContainer>
      <ArticleImage
        src={ article.thumbnail.small }
        alt="" />
    </StyledArticle>
  )
}


export default Article