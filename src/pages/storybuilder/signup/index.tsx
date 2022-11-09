import { BuilderLayout } from "@/components/layout/builder"
import { StaffSignup } from "@/components/staff/signup"
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]"
import { NextPageWithLayout } from "@/pages/_app"
import { GetServerSidePropsContext } from "next"
import { unstable_getServerSession } from "next-auth"


const StaffSignupPage: NextPageWithLayout = () =>{

  return (
    <StaffSignup />
  )
}

StaffSignupPage.getLayout = page => BuilderLayout(page, true)

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
    props: {}
  }
}


export default StaffSignupPage