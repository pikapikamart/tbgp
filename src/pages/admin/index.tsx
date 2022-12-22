import { AdminHome } from "@/components/admin/home";
import { AdminLayout } from "@/components/layout/admin";
import { findAdminService } from "@/src/server/services/admin.service";
import { wrapper } from "@/store/index";
import { thunkSetAdminReducer } from "@/store/reducers/admin.reducers";
import { GetServerSidePropsContext } from "next";
import { NextPageWithLayout } from "../_app";
import { getToken } from "next-auth/jwt";
import { connectDatabase } from "@/src/server/database";


const AdminHomepage: NextPageWithLayout = () => {

  return (
    <AdminHome />
  )
}

AdminHomepage.getLayout = ( page ) => AdminLayout(page)

export const getServerSideProps = wrapper.getServerSideProps(store => async( context: GetServerSidePropsContext ) =>{
  const session = await getToken({ req: context.req })
  
  if ( !session || session.userType!=="admin" ) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    }
  }

  await connectDatabase()

  const foundAdmin = await findAdminService(
    { email: session.email },
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