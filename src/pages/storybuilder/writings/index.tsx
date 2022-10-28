import { BuilderLayout } from "@/components/layout/builder"
import { StaffWritings } from "@/components/staff/writings"
import { NextPageWithLayout } from "../../_app"


const WritingsPage: NextPageWithLayout = () =>{

  return(
    <StaffWritings />
  )
}

WritingsPage.getLayout = ( page ) => BuilderLayout(page)
WritingsPage.requireAuth = true

export default WritingsPage