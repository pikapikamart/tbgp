import { ArticleAuthors } from "@/components/shared/article/authors"
import { ArticleDate } from "@/components/shared/article/date"
import { Author } from "@/src/server/controllers/article.controller"
import { 
  InitArticleCaption, 
  InitArticleMainHeading } from "@/styled/shared/article/initial"
import Link from "next/link"
import { useWriter } from "./writer.hook"
import { 
  Article,
  ArticleImage,
  ArticleList,
  ArticlesContainer,
  ArticleTextContainer,
  ArticleTitle,
  AuthorBio,
  AuthorName,
  WriterHeader, 
  WriterWrapper } from "./writer.styled"


const Writer = () =>{
  const {
    isError,
    author,
    authorArticles,
    ref
  } = useWriter()

  if ( isError ) {
    return <>Writer not found</>
  }

  if ( !author ) {
    return <>Loading</>
  }

  const renderOwnedArticles = () =>{
    const articles = authorArticles.map(article => (
      <Article key={ article.title }>
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
      </Article>
    ))

    return articles
  }

  const authorName = ( author: Author ) => `${ author.firstname } ${ author.lastname }`

  return (
    <WriterWrapper>
      <WriterHeader>
        <AuthorName>{ authorName(author) }</AuthorName>
        <AuthorBio>
          { author.bio!==""? author.bio : `Hi! My name is ${ authorName(author) }. I have yet to fill out my bio, but one thing's for sure, I love writing for The Bastion Group of Publications!` }
        </AuthorBio>
      </WriterHeader>
      <ArticlesContainer>
        <InitArticleMainHeading alignment="left">
          <span>Articles from { authorName(author) }</span>
        </InitArticleMainHeading>
        <ArticleList>
          { renderOwnedArticles() }
        </ArticleList>
        <div
          ref={ ref }
          data-usage="paginate" />
      </ArticlesContainer>
    </WriterWrapper>
  )
}


export default Writer