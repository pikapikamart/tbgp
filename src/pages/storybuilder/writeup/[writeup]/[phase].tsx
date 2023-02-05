import { BuilderLayout } from "@/components/layout/builder"
import { StaffWriteup } from "@/components/staff/writeup"
import { NextPageWithLayout } from "@/pages/_app"
import { 
  GetServerSideProps, 
  InferGetServerSidePropsType } from "next"
import { useWriteupPhaseCollaboration } from "@/components/staff/writeup/phase.hook"


const WriteupPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ socketUri }) =>{
  useWriteupPhaseCollaboration(socketUri)

  return (
    <StaffWriteup />
  )
}

WriteupPage.getLayout = ( page ) => BuilderLayout(page)
WriteupPage.requireAuth = true

export const getServerSideProps: GetServerSideProps = async( context ) =>{
  const socketUriLocal = process.env.SOCKET_URI_PROD as string
  const socketUriWifi = process.env.SOCKET_URI_WIFI as string
  const socketUriProd = process.env.SOCKET_URI_PROD as string
  const deployment = process.env.NODE_ENV
  let socketUri: string = ""

  if ( deployment==="production" ) {
    socketUri = socketUriProd
  } else {
    // socketUri = context.req.headers.host?.includes("localhost")? socketUriLocal : socketUriWifi
    socketUri = socketUriLocal
  }


  return {
    props: {
      socketUri: deployment==="production"? socketUriProd : socketUriLocal
    }
  }
}


export default WriteupPage