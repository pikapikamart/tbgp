import { AdminLogin } from "@/components/admin/login";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";


const AdminLoginPage: NextPage = () => {

  return (
    <AdminLogin />
  )
}

export const getServerSideProps = async( context: GetServerSidePropsContext ) => {
  const session = await unstable_getServerSession(context.req, context.res, nextAuthOptions)

  if ( session?.user?.userType==="admin" ) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
}


export default AdminLoginPage;