import { 
  Find, 
  Input, 
  SearchbarWrapper } from "./searchbar.styled"


const Searchbar = () =>{

  return (
    <SearchbarWrapper as="form">
      <Input
        id="article"
        type="text"
        placeholder="Search..."
        name="article" />
      <Find type="submit" >Find</Find>
    </SearchbarWrapper>
  )
}


export default Searchbar