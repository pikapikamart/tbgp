import { DefaultLayout } from "@/components/layout/default";
import { LatestArticles } from "@/components/main/latest";
import { Helmet } from "react-helmet-async";
import { NextPageWithLayout } from "../_app";


const LatestPage: NextPageWithLayout = () =>{

  return (
    <>
      <Helmet>
        <title>Latest | TBGP</title>
      </Helmet>
      <LatestArticles />
    </>
  )
}

LatestPage.getLayout = page => DefaultLayout(page)


export default LatestPage