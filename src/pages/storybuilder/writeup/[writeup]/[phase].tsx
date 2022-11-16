import { BuilderLayout } from "@/components/layout/builder"
import { StaffWriteup } from "@/components/staff/writeup"
import { NextPageWithLayout } from "@/pages/_app"
import { InferGetServerSidePropsType } from "next"
import { useWriteupPhaseCollaboration } from "@/components/staff/writeup/phase.hook"


const WriteupPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ socketUri }) =>{
  useWriteupPhaseCollaboration(socketUri)

  return (
    <StaffWriteup />
  )
}

WriteupPage.getLayout = ( page ) => BuilderLayout(page)
WriteupPage.requireAuth = true

export const getServerSideProps = async() =>{
  const socketUri = process.env.SOCKET_URI as string
  const socketUriProd = process.env.SOCKET_URI_PROD as string
  const deployment = process.env.NODE_ENV

  if ( !socketUri || !socketUriProd ) {
    // do something 
  }

  return {
    props: {
      socketUri: deployment==="production"? socketUriProd : socketUri
    }
  }
}


export default WriteupPage