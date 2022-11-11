import { StaffProfile } from "@/store/store.types"
import { InitArticleAuthorsContainer, InitArticleAuthorsList, InitArticleAuthorsListItem } from "@/styled/shared/article/initial"


type AuthorsProps = {
  children?: React.ReactNode,
  authors: StaffProfile[]
}

const Authors = ({ children, authors }: AuthorsProps) =>{

  const renderAuthors = () =>{
    const authorsArr = authors.map((author, index) => (
      <InitArticleAuthorsListItem key={ author.username }>
        { author.firstname } { author.lastname } { index!==authors.length-1? ", " : "" }
      </InitArticleAuthorsListItem>
    ))

    return authorsArr
  }

  return (
    <InitArticleAuthorsContainer>
      <span>By </span>
      <InitArticleAuthorsList>
        { renderAuthors() }
      </InitArticleAuthorsList>
      { children? children : <></> }
    </InitArticleAuthorsContainer> 
  )
}


export default Authors