import { Author } from "@/src/server/controllers/article.controller"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { AuthorArticle } from "./article"
import { useWriter, useWriterArticles } from "./writer.hook"
import { 
  ArticleList,
  ArticlesContainer,
  AuthorBio,
  AuthorName,
  WriterHeader, 
  WriterWrapper } from "./writer.styled"


const Writer = () =>{
  const {
    isError,
    author
  } = useWriter()
  const {
    ref,
    authorArticles
  } = useWriterArticles(author?._id)

  if ( isError ) {
    return <>Writer not found</>
  }

  if ( !author ) {
    return <>Loading</>
  }

  const renderOwnedArticles = () =>{
    const articles = authorArticles.map(article => (
      <AuthorArticle 
        key={ article.linkPath }
        article={ article } />
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