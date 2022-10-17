import { AdminHome } from "@/components/admin/home";
import { AdminLayout } from "@/components/layout/admin";
import { findAdminService } from "@/src/server/services/admin.service";
import { wrapper } from "@/store/index";
import { thunkSetAdminReducer } from "@/store/reducers/admin.reducers";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]";
import { NextPageWithLayout } from "../_app";


const AdminHomepage: NextPageWithLayout = () => {

  return (
    <AdminHome />
  )
}

AdminHomepage.getLayout = ( page ) => AdminLayout(page)

export const getServerSideProps = wrapper.getServerSideProps(store => async( context: GetServerSidePropsContext ) =>{
  const session = await unstable_getServerSession(context.req, context.res, nextAuthOptions)

  if ( !session || session.user?.userType!=="admin" ) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    }
  }

  const foundAdmin = await findAdminService(
    { email: session.user.email },
    "-_id bastionIds verifications"
  )

  if ( !foundAdmin ) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    }
  }

  store.dispatch(thunkSetAdminReducer(JSON.parse(JSON.stringify(foundAdmin))))

  return {
    props: {}
  }
}) 


export default AdminHomepage;