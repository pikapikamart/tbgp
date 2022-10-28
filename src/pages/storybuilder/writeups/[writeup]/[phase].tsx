import { BuilderLayout } from "@/components/layout/builder"
import { NextPageWithLayout } from "@/pages/_app"
import { useRouter } from "next/router"


const WriteupPage: NextPageWithLayout = () =>{
  const router = useRouter()

  return (
    <>
      { JSON.stringify(router.query) }
    </>
  )
}

WriteupPage.getLayout = ( page ) => BuilderLayout(page)
WriteupPage.requireAuth = true


export default WriteupPage