import { Article } from "@/components/main/article";
import { wrapper } from "@/store/index";
import { 
  FullArticle, 
  setViewingArticle } from "@/store/slices/articles.slice";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { connectDatabase } from "../server/database";
import { populateArticleService } from "../server/services/article.service";
import { NextPageWithLayout } from "./_app";


const ArticlePage: NextPageWithLayout = () =>{
  
  return (
    <Article />
  )
}

type ArticleParams = ParsedUrlQuery & {
  article: string
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async(context) => {
  await connectDatabase()
  const { article } = context.params as ArticleParams
  const foundArticle = await populateArticleService(
    { linkPath: article },
    "-_id category authors title linkPath caption banner content views createdAt",
    {},
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  store.dispatch(setViewingArticle(JSON.parse(JSON.stringify(foundArticle[0]?? null)) as never as FullArticle))

  return {
    props: {}
  }
})


export default ArticlePage