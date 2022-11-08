import { useExpansion } from "@/lib/hooks"
import { 
  Find, 
  Input, 
  Searchbar as StyledSearchbar,
  SearchbarTrigger,
  SearchbarWrapper } from "./searchbar.styled"


const Searchbar = () =>{
  const { isExpanded, handleExpansion } = useExpansion()

  return (
    <SearchbarWrapper>
      <SearchbarTrigger
        onClick={ handleExpansion }
        aria-expanded={ isExpanded } />
      <StyledSearchbar as="form">
        <Input
          id="article"
          type="text"
          placeholder="Search..."
          name="article" />
        <Find type="submit" >Find</Find>
      </StyledSearchbar>
    </SearchbarWrapper>
  )
}


export default Searchbar