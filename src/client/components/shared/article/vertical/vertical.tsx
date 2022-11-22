import { InitialArticle } from "@/store/slices/articles.slice"
import { 
  InitArticleCaption, 
  InitArticleCategory } from "@/styled/shared/article/initial"
import Link from "next/link"
import { ArticleAuthors } from "../authors"
import { ArticleDate } from "../date"
import { 
  VerticalArticleTitle, 
  VerticalArticleWrapper, 
  VerticalImage } from "./vertical.styled"


type VerticalProps = {
  article: InitialArticle,
  titleFormat: "one" | "two" | "three",
  hideCaption?: boolean,
  hideImage?: boolean,
  thumbnail?: "medium",
  shouldReverse?: boolean
}

// if hideCaption === true: add border in the bottom
const Vertical = ({ hideCaption, article, titleFormat, hideImage, thumbnail, shouldReverse }: VerticalProps) => {

  return (
    <VerticalArticleWrapper shouldReverse={ shouldReverse }>
      <InitArticleCategory>
        <span>{ article.category }</span>
      </InitArticleCategory>
      <VerticalArticleTitle titleFormat={ titleFormat } >
        <Link
          href={ `/${ article.linkPath }` }
          passHref>
          <a>{ article.title }</a>
        </Link>
      </VerticalArticleTitle>
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