import { BuilderLayout } from "@/components/layout/builder"
import { connectDatabase } from "@/src/server/database"
import { findStaff } from "@/src/server/services/staff.service"
import { wrapper } from "@/store/index"
import { GetServerSidePropsContext} from "next"
import { getToken } from "next-auth/jwt"
import { thunkSetStaffReducer } from "../../client/store/reducers/staff.reducer"
import { NextPageWithLayout } from "../_app"


const StoryBuilderPage: NextPageWithLayout = () =>{

  return(
    <>Hey</>
  )
}

StoryBuilderPage.getLayout = ( page ) => BuilderLayout(page)

export const getServerSideProps = wrapper.getServerSideProps(store => async( context: GetServerSidePropsContext ) =>{
  await connectDatabase()
  const token = await getToken({ req: context.req })

  if ( !token ) {
    return {
      redirect: {
        destination: "/storybuilder/login",
        permanent: false
      }
    }
  }

  const staff = await findStaff(
    { email: token.email },
    "-_id -__v -password",
    {},
    {
      path: "requests.story storyRequests.joined storyRequests.created"
    }
  )

  if ( !staff ) {
    return {
      redirect: {
        destination: "/storybuilder/login",
        permanent: false
      }
    }
  }

  store.dispatch(thunkSetStaffReducer(JSON.parse(JSON.stringify(staff))))

  return {
    props: {}
  }
})


export default StoryBuilderPage