import { Author } from "@/src/server/controllers/article.controller"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"
import { AuthorArticle } from "./article"
import { useWriterArticles } from "./writer.hook"
import { 
  ArticleList,
  ArticlesContainer,
  AuthorBio,
  AuthorName,
  WriterHeader, 
  WriterWrapper } from "./writer.styled"


type WriterProps = {
  author: Author
}

const Writer = ({ author }: WriterProps) =>{
  const { ref, authorArticles } = useWriterArticles(author?._id)

  const renderOwnedArticles = () =>{
    const articles = authorArticles.map(article => (
      <AuthorArticle 
        key={ article.linkPath }
        article={ article } />
    ))

    return articles
  }

  return (
    <WriterWrapper>
      <WriterHeader>
        <AuthorName>{ `${ author.firstname } ${ author.middlename } ${ author.lastname }` }</AuthorName>
        <AuthorBio>
          { author.bio!==""? author.bio : `Hi! My name is ${ `${ author.firstname } ${ author.lastname }` }. I have yet to fill out my bio, but one thing's for sure, I love writing for The Bastion Group of Publications!` }
        </AuthorBio>
      </WriterHeader>
      <ArticlesContainer>
        <InitArticleMainHeading alignment="left">
          <span>Articles from { `${ author.firstname } ${ author.lastname }` }</span>
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