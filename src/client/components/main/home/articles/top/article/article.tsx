import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { InitialArticle } from "@/store/slices/articles.slice"
import { 
  InitArticleCaption, 
  InitArticleCategory } from "@/styled/shared/article/initial"
import Link from "next/link"
import { 
  ArticleImage,
  ArticleTitle, 
  ArticleWrapper } from "./article.styled"


type ArticleProps = {
  article: InitialArticle,
  hideCaption: boolean
}

const Article = ({ article, hideCaption }: ArticleProps) =>{

  return (
    <ArticleWrapper as="div">
      <InitArticleCategory>
        <span>{ article.category }</span>
      </InitArticleCategory>
      <ArticleTitle>
        <Link
          href={ `/${ article.linkPath }` }
          passHref>
            <a>{ article.title }</a>
        </Link>
      </ArticleTitle>
      <ArticleAuthors authors={ article.authors }>
        <ArticleDate date={ article.createdAt } />
      </ArticleAuthors>
      { !hideCaption && <InitArticleCaption>{ article.caption }</InitArticleCaption> }
      { article.thumbnail.medium!=="" && (
        <ArticleImage 
          src={ article.thumbnail.medium }
          alt="" />
      ) }
    </ArticleWrapper>
  )
}


export default Article