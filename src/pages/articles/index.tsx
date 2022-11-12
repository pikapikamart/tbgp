import { DefaultLayout } from "@/components/layout/default";
import { Articles } from "@/components/main/articles";
import { NextPageWithLayout } from "../_app";


const ArticlesPage: NextPageWithLayout = () =>{

  return (
    <Articles />
  )
}

ArticlesPage.getLayout = page => DefaultLayout(page)


export default ArticlesPage