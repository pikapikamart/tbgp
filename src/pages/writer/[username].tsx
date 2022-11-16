import { DefaultLayout } from "@/components/layout/default";
import { Writer } from "@/components/main/writer";
import { Author } from "@/src/server/controllers/article.controller";
import { connectDatabase } from "@/src/server/database";
import {
  findStaffService, 
  findManyStaffsService } from "@/src/server/services/staff.service";
import { wrapper } from "@/store/index";
import { 
  GetStaticPaths, 
  GetStaticPropsContext, 
  InferGetStaticPropsType} from "next";
import { ParsedUrlQuery } from "querystring";
import { Helmet } from "react-helmet-async";
import { NextPageWithLayout } from "../_app";


const UsernamePage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({ author }) =>{
  
  if ( !author ) {
    return <></>
  }

  return (
    <>
      <Helmet>
        <title>{ author.firstname + " " + author.lastname } | TBGP</title>
      </Helmet>
      <Writer author={ author } />
    </>
  )
}

UsernamePage.getLayout = page => DefaultLayout(page)

type Params = {
  params: {
    username: string
  }
}

export const getStaticPaths: GetStaticPaths = async() =>{
  await connectDatabase()
  const writers = await findManyStaffsService({}, "-_id username")
  const writersParams = writers.reduce((accu, curr) => {
    accu.push({
      params: {
        username: curr.username
      }
    })

    return accu
  }, [] as Params[])

  return {
    paths: writersParams,
    fallback: true
  }
}

type UsernameParams = ParsedUrlQuery & {
  username: string
}

export const getStaticProps = wrapper.getStaticProps(store => async( context: GetStaticPropsContext ) =>{
  await connectDatabase()
  const { username } = context.params as UsernameParams
  const author = await findStaffService(
    { username },
    "firstname lastname username bio"
  ) as unknown as Author

  return {
    props: {
      author: JSON.parse(JSON.stringify(author)) as Author
    }
  }
})


export default UsernamePage