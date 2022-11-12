import { DefaultLayout } from "@/components/layout/default";
import { NextPageWithLayout } from "../_app";


const SearchPage: NextPageWithLayout = () =>{

  return (
    <></>
  )
}

SearchPage.getLayout = page => DefaultLayout(page)


export default SearchPage