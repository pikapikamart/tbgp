import { StaffProfile } from "@/store/store.types"
import { 
  InitArticleAuthorsContainer,
  InitArticleAuthor } from "@/styled/shared/article/initial"
import Link from "next/link"


type AuthorsProps = {
  children?: React.ReactNode,
  authors: StaffProfile[]
}

const Authors = ({ children, authors }: AuthorsProps) =>{

  const renderAuthors = () =>{
    const authorsArr = authors.map((author, index) => (
      <InitArticleAuthor key={ author.username }>
        <Link
          href={ `/writer/${ author.username }` }
          passHref>
          <a>
            { author.firstname } { author.lastname } { index!==authors.length-1? ", " : "" }
          </a>
        </Link>
      </InitArticleAuthor>
    ))

    return authorsArr
  }

  return (
    <InitArticleAuthorsContainer>
      <span>By </span>
        { renderAuthors() }
      { children? children : <></> }
    </InitArticleAuthorsContainer> 
  )
}


export default Authors