import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { InitialArticle } from "@/store/slices/articles.slice"
import { InitArticleCategory } from "@/styled/shared/article/initial"
import Link from "next/link"
import { 
  ArticleImage,
  ArticleLeftBlock, 
  ArticleTitle, 
  ArticleWrapper } from "./article.styled"


type ArticleProps = {
  article: InitialArticle
}

const Article = ({ article }: ArticleProps) =>{

  return (
    <ArticleWrapper>
      <ArticleLeftBlock>
        <InitArticleCategory>
          <span>{ article.category }</span>
        </InitArticleCategory>
        <ArticleTitle>
          <Link 
            href={ article.linkPath }
            passHref>
              <a>{ article.title }</a>
          </Link>
        </ArticleTitle>
        <ArticleAuthors authors={ article.authors }>
          <ArticleDate date={ article.createdAt } />
        </ArticleAuthors>
      </ArticleLeftBlock>
      <ArticleImage 
        src={ article.thumbnail.small }
        alt="" />
    </ArticleWrapper>
  )
}


export default Article