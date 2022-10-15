import { BuilderLayout } from "@/components/layout/builder"
import { NextPageWithLayout } from "../_app"


const StoryBuilderPage: NextPageWithLayout = () =>{

  return(
    <>Hey</>
  )
}

StoryBuilderPage.getLayout = ( page ) => BuilderLayout(page)


export default StoryBuilderPage