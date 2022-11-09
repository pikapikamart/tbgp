import { BuilderLayout } from "@/components/layout/builder"
import { StaffLogin } from "@/components/staff/login"
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]"
import { NextPageWithLayout } from "@/pages/_app"
import { GetServerSidePropsContext } from "next"
import { unstable_getServerSession } from "next-auth"


const StaffLoginPage: NextPageWithLayout = () =>{

  return (
    <StaffLogin />
  )
}

StaffLoginPage.getLayout = ( page ) => BuilderLayout(page, true)

export const getServerSideProps = async( context: GetServerSidePropsContext ) =>{
  const session = await unstable_getServerSession(context.req, context.res, nextAuthOptions)

  if ( session?.user?.userType==="staff" ) {
    return {
      redirect: {
        destination: "/storybuilder",
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
}


export default StaffLoginPage