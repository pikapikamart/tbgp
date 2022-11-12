import { DefaultLayout } from "@/components/layout/default";
import { LatestArticles } from "@/components/main/latest";
import { NextPageWithLayout } from "../_app";


const LatestPage: NextPageWithLayout = () =>{

  return (
    <LatestArticles />
  )
}

LatestPage.getLayout = page => DefaultLayout(page)


export default LatestPage