import { BuilderLayout } from "@/components/layout/builder"
import { StaffWriteup } from "@/components/staff/writeup"
import { NextPageWithLayout } from "@/pages/_app"


const WriteupPage: NextPageWithLayout = () =>{

  return (
    <StaffWriteup />
  )
}

WriteupPage.getLayout = ( page ) => BuilderLayout(page)
WriteupPage.requireAuth = true


export default WriteupPage