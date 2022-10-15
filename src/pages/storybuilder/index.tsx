import { BuilderLayout } from "@/components/layout/builder"
import { connectDatabase } from "@/src/server/database"
import { GetServerSidePropsContext } from "next"
import { getToken } from "next-auth/jwt"
import { NextPageWithLayout } from "../_app"


const StoryBuilderPage: NextPageWithLayout = () =>{

  return(
    <>Hey</>
  )
}

StoryBuilderPage.getLayout = ( page ) => BuilderLayout(page)

export const getServerSideProps = async( context: GetServerSidePropsContext ) =>{
  await connectDatabase()
  const token = await getToken({ req: context.req })

  return {
    props: {}
  }
}


export default StoryBuilderPage