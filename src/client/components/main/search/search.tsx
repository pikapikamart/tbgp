import { SearchArticle } from "./article"
import { useSearch } from "./search.hook"
import { 
  ArticleList,
  SearchHeader,
  SearchMainHeading, 
  SearchWrapper } from "./search.styled"


const Search = () =>{
  const { 
    query,
    articles,
    ref } = useSearch()

  const renderSearchArticles = () =>{
    const searchArticles = articles.map(article => (
      <SearchArticle
        key={ article.title }
        article={ article } />
    ))

    return searchArticles
  }

  return (
    <main>
      <SearchWrapper>
        <SearchHeader>
          <SearchMainHeading>
            Showing results for:
            <span>{ query }</span>
          </SearchMainHeading>
        </SearchHeader>
        <ArticleList>
          { renderSearchArticles() }
        </ArticleList>
        <div
          ref={ ref }
          data-usage="paginate" />
      </SearchWrapper>
    </main>
  )
}


export default Search