import { BuilderLayout } from "@/components/layout/builder"
import { StaffHome } from "@/components/staff/home"
import { NextPageWithLayout } from "../_app"


const StoryBuilderPage: NextPageWithLayout = () =>{

  return(
    <StaffHome />
  )
}

StoryBuilderPage.getLayout = ( page ) => BuilderLayout(page)
StoryBuilderPage.requireAuth = true

export default StoryBuilderPage