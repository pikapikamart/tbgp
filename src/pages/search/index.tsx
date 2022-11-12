import { DefaultLayout } from "@/components/layout/default";
import { Search } from "@/components/main/search";
import { NextPageWithLayout } from "../_app";


const SearchPage: NextPageWithLayout = () =>{

  return (
    <Search />
  )
}

SearchPage.getLayout = page => DefaultLayout(page)


export default SearchPage