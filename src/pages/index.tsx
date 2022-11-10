import { DefaultLayout } from "@/components/layout/default";
import { Home } from "@/components/main/home";
import { wrapper } from "@/store/index";
import { setArticles } from "@/store/slices/articles.slice";
import { connectDatabase } from "../server/database";
import { populateArticleService } from "../server/services/article.service";
import { NextPageWithLayout } from "./_app";


const Homepage: NextPageWithLayout = () =>{

  return (
    <Home />
  )
}

Homepage.getLayout = ( page ) => DefaultLayout(page)

export const getServerSideProps = wrapper.getServerSideProps(store => async() =>{
  await connectDatabase()
  const maxRangeDate = new Date()
  const minRangeDate = new Date()
  minRangeDate.setDate(minRangeDate.getDate()-10)

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
      createdAt: {
        $lte: new Date(processDate(maxRangeDate)),
        $gte: new Date(processDate(minRangeDate))
      }
    },
    "-_id category linkPath authors title caption thumbnail createdAt views",
    {
      sort: "views"
    },
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  const latestArticles = await populateArticleService(
    {},
    "-_id category linkPath authors title caption thumbnail.small createdAt",
    {
      sort: {
        createdAt: -1
      },
      limit: 9
    },
    {
      path: "authors",
      select: "-_id firstname lastname username"
    }
  )

  store.dispatch(setArticles({
    topArticles: JSON.parse(JSON.stringify(topArticles)),
      latestArticles: JSON.parse(JSON.stringify(latestArticles))
  }))

  return {
    props: {}
  }
})

export default Homepage;