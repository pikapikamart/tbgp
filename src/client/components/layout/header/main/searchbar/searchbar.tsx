import { useSearchbar } from "./searchbar.hook"
import { 
  Find, 
  Input, 
  Searchbar as StyledSearchbar,
  SearchbarTrigger,
  SearchbarWrapper } from "./searchbar.styled"


const Searchbar = () =>{
  const {
    isExpanded,
    handleExpansion,
    handleFormSubmit,
    addFieldRef
  } = useSearchbar()

  return (
    <SearchbarWrapper>
      <SearchbarTrigger
        onClick={ handleExpansion }
        aria-expanded={ isExpanded } />
      <StyledSearchbar 
        as="form"
        onSubmit={ handleFormSubmit }>
        <Input
          id="article"
          type="text"
          placeholder="Search..."
          name="article"
          ref={ addFieldRef }
          aria-required="true" />
        <Find type="submit" >Find</Find>
      </StyledSearchbar>
    </SearchbarWrapper>
  )
}


export default Searchbar