import { AdminHome } from "@/components/admin/home";
import { AdminLayout } from "@/components/layout/admin";
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


export const getServerSideProps = async( context: GetServerSidePropsContext ) =>{
  const session = await unstable_getServerSession(context.req, context.res, nextAuthOptions)

  if ( !session || session.user?.userType!=="admin" ) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default AdminHomepage;