import { InitialArticle } from "@/store/slices/articles.slice"
import { InitArticleCaption, InitArticleCategory } from "@/styled/shared/article/initial"
import { ArticleAuthors } from "../authors"
import { ArticleDate } from "../date"
import { VerticalArticleTitle, VerticalArticleWrapper, VerticalImage } from "./vertical.styled"


type VerticalProps = {
  article: InitialArticle,
  titleFormat: "one" | "two" | "three",
  hideCaption?: boolean,
  hideImage?: boolean,
  thumbnail?: "medium"
}

// if hideCaption === true: add border in the bottom
const Vertical = ({ hideCaption, article, titleFormat, hideImage, thumbnail }: VerticalProps) => {

  return (
    <VerticalArticleWrapper>
      <InitArticleCategory>
        <span>{ article.category }</span>
      </InitArticleCategory>
      <VerticalArticleTitle titleFormat={ titleFormat } >{ article.title }</VerticalArticleTitle>
      <ArticleAuthors authors={ article.authors }>
        <ArticleDate date={ article.createdAt } />
      </ArticleAuthors>
      { !hideCaption && <InitArticleCaption>{ article.caption }</InitArticleCaption> }
      { !hideImage && (
        <VerticalImage
          src={ thumbnail!=="medium"? article.thumbnail.small : article.thumbnail.medium }
          alt="" />
      ) }
    </VerticalArticleWrapper>
  )
}


export default Vertical