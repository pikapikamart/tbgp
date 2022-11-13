import { DefaultLayout } from "@/components/layout/default";
import { connectDatabase } from "@/src/server/database";
import { findArticleCategoryService } from "@/src/server/services/article.category.service";
import { wrapper } from "@/store/index";
import { 
  GetStaticPaths, 
  GetStaticPropsContext, 
  InferGetStaticPropsType} from "next";
import { ParsedUrlQuery } from "querystring";
import { NextPageWithLayout } from "../_app";
import { populateArticleService } from "@/src/server/services/article.service"
import { setCategorizedArticles } from "@/store/slices/articles.slice";
import { Categorized } from "@/components/main/categorized";
import { Helmet } from "react-helmet-async"


const CategoryPage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({ category }) =>{

  return (
    <>
    <Helmet>
      <title>{ `${ category }` } | TBGP</title>
    </Helmet>
      <Categorized />
    </>
  )
}


CategoryPage.getLayout = page => DefaultLayout(page)

type Params = {
  params: {
    category: string
  }
}

export const getStaticPaths: GetStaticPaths = async() => {
  await connectDatabase()
  const categories = await findArticleCategoryService({})
  const categoriesParams = categories?.categories.reduce(( accu, curr ) =>{
    accu.push({
      params: {
        category: curr
      }
    })

    return accu
  }, [] as Params[])

  return {
    paths: categoriesParams?? [{ params: { category: "" } }],
    fallback: false
  }
}

type CategoryParams = ParsedUrlQuery & {
  category: string
}

export const getStaticProps = wrapper.getStaticProps(store => async( context: GetStaticPropsContext ) => {
  await connectDatabase()
  const { category } = context.params as CategoryParams
  const maxRangeDate = new Date()
  maxRangeDate.setDate(maxRangeDate.getDate()+1)
  const minRangeDate = new Date()
  minRangeDate.setDate(minRangeDate.getDate()-14)

  const processDate = ( date: Date ) => {
    return date.toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "2-digit",
      day: "numeric"
    })
    .split("/")
    .join("-")
  }
  const topArticles = await populateArticleService(
    {
      category,
      createdAt: {
        $lte: new Date(processDate(maxRangeDate)),
        $gte: new Date(processDate(minRangeDate))
      }
    },
    "-_id linkPath authors title caption thumbnail createdAt views",
    {
      sort: "views",
      limit: 6
    },
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  const moreArticles = await populateArticleService(
    { category },
    "linkPath authors title caption thumbnail.small createdAt views",
    {
      sort: {
        createdAt: -1
      },
      limit: 8
    },
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  store.dispatch(setCategorizedArticles({
    topArticles: JSON.parse(JSON.stringify(topArticles)),
    moreArticles: JSON.parse(JSON.stringify(moreArticles))
  }))

  return {
    props: {
      category
    }
  }
})


export default CategoryPage