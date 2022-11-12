import { Article } from "@/components/main/article";
import { wrapper } from "@/store/index";
import { 
  FullArticle, 
  setViewingArticle } from "@/store/slices/articles.slice";
import { 
  GetStaticPaths, 
  GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { connectDatabase } from "../server/database";
import { 
  findAllArticleLinksService, 
  populateArticleService } from "../server/services/article.service";
import { NextPageWithLayout } from "./_app";


const ArticlePage: NextPageWithLayout = () =>{
  
  return (
    <Article />
  )
}

type Params = {
  params: {
    article: string
  }
}

export const getStaticPaths: GetStaticPaths = async() =>{
  await connectDatabase()
  const articles = await findAllArticleLinksService()
  const articlesParams = articles.reduce((accu, curr) => {
    accu.push({
      params: {
        article: curr.linkPath
      }
    })

    return accu
  }, [] as Params[])

  return {
    paths: articlesParams,
    fallback: true
  }
}


type ArticleParams = ParsedUrlQuery & {
  article: string
}

export const getStaticProps = wrapper.getStaticProps(store => async(context: GetStaticPropsContext) => {
  await connectDatabase()
  const { article } = context.params as ArticleParams
  const foundArticle = await populateArticleService(
    { linkPath: article },
    "-_id category authors title caption banner content views createdAt",
    {},
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  if ( !foundArticle[0] ) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  store.dispatch(setViewingArticle(JSON.parse(JSON.stringify(foundArticle[0])) as never as FullArticle))

  return {
    props: {}
  }
})


export default ArticlePage