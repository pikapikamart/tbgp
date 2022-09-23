import { BuilderLayout } from "@/components/layout/builder";
import { NextPageWithLayout } from "./_app";


const Homepage: NextPageWithLayout = () =>{

  return (
    <div>
      Oh hey
    </div>
  )
}

Homepage.getLayout = ( page ) => BuilderLayout(page)


export default Homepage;