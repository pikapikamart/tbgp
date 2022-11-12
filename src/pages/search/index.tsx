import { DefaultLayout } from "@/components/layout/default";
import { Search } from "@/components/main/search";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet-async";
import { NextPageWithLayout } from "../_app";


const SearchPage: NextPageWithLayout = () =>{
  const router = useRouter()

  return (
    <>
      <Helmet>
        <title>{ `${ router.query["query"] }` } | TBGP</title>
      </Helmet>
      <Search />
    </>
  )
}

SearchPage.getLayout = page => DefaultLayout(page)


export default SearchPage