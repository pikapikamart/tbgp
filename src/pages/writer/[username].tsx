import { DefaultLayout } from "@/components/layout/default";
import { Writer } from "@/components/main/writer";
import { FourOhFour } from "@/components/shared/404";
import { Author } from "@/src/server/controllers/article.controller";
import { connectDatabase } from "@/src/server/database";
import {findStaffService, } from "@/src/server/services/staff.service";
import { 
  GetServerSidePropsContext,
  InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { Helmet } from "react-helmet-async";
import { NextPageWithLayout } from "../_app";


const UsernamePage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ author }) =>{
  
  if ( !author ) {
    return (
      <FourOhFour>
        Make sure to check the writer's name if correct
      </FourOhFour>
    )
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

type UsernameParams = ParsedUrlQuery & {
  username: string
}

export const getServerSideProps = async( context: GetServerSidePropsContext ) =>{
  await connectDatabase()
  const { username } = context.params as UsernameParams
  const author = await findStaffService(
    { username },
    "firstname middlename lastname username bio"
  ) as unknown as Author

  return {
    props: {
      author: JSON.parse(JSON.stringify(author)) as Author
    }
  }
}


export default UsernamePage