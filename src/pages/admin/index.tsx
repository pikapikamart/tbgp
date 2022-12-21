import { AdminHome } from "@/components/admin/home";
import { AdminLayout } from "@/components/layout/admin";
import { findAdminService } from "@/src/server/services/admin.service";
import { wrapper } from "@/store/index";
import { thunkSetAdminReducer } from "@/store/reducers/admin.reducers";
import { GetServerSidePropsContext } from "next";
import { NextPageWithLayout } from "../_app";
import { getToken } from "next-auth/jwt";


const AdminHomepage: NextPageWithLayout = () => {

  return (
    <AdminHome />
  )
}

AdminHomepage.getLayout = ( page ) => AdminLayout(page)

export const getServerSideProps = wrapper.getServerSideProps(store => async( context: GetServerSidePropsContext ) =>{
  console.log("start sess")
  const session = await getToken({ req: context.req })
  console.log(session)
  if ( !session || session.userType!=="admin" ) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    }
  }

  const foundAdmin = await findAdminService(
    { email: session.email },
    "-_id bastionIds verifications"
  )
    console.log(foundAdmin)
  if ( !foundAdmin ) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    }
  }
  console.log("before dispatch")
  store.dispatch(thunkSetAdminReducer(JSON.parse(JSON.stringify(foundAdmin))))
  console.log(session)
  return {
    props: {}
  }
}) 


export default AdminHomepage;