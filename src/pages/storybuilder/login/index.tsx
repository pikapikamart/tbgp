import { StaffLogin } from "@/components/staff/login"
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]"
import { GetServerSidePropsContext } from "next"
import { unstable_getServerSession } from "next-auth"


const StaffLoginPage = () =>{

  return (
    <StaffLogin />
  )
}

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