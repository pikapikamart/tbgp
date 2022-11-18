import { DefaultLayout } from "@/components/layout/default";
import { connectDatabase } from "@/src/server/database";
import { wrapper } from "@/store/index";
import { 
  GetServerSideProps, 
  InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { NextPageWithLayout } from "../_app";
import { populateArticleService } from "@/src/server/services/article.service"
import { setCategorizedArticles } from "@/store/slices/articles.slice";
import { Categorized } from "@/components/main/categorized";
import { Helmet } from "react-helmet-async"
import { storyCategories } from "@/src/server/models/story.request.model";


const CategoryPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ category }) =>{

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

type CategoryParams = ParsedUrlQuery & {
  category: string
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async( context ) => {
  await connectDatabase()
  const { category } = context.params as CategoryParams
  const maxRangeDate = new Date()
  const minRangeDate = new Date()
  maxRangeDate.setDate(maxRangeDate.getDate()+1)
  minRangeDate.setDate(minRangeDate.getDate()-14)
  const sanitizedCategory = category.toLowerCase()
  const storyCategory = storyCategories[sanitizedCategory]

  if ( !storyCategory ) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

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
      category: storyCategory,
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
    { category: storyCategory },
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
    category: storyCategory,
    topArticles: JSON.parse(JSON.stringify(topArticles)),
    moreArticles: JSON.parse(JSON.stringify(moreArticles))
  }))

  return {
    props: {
      category: storyCategory
    }
  }
})


export default CategoryPage