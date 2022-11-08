import { DefaultLayout } from "@/components/layout/default";
import { NextPageWithLayout } from "./_app";


const Homepage: NextPageWithLayout = () =>{

  return (
    <div>
      Oh hey
    </div>
  )
}

Homepage.getLayout = ( page ) => DefaultLayout(page)


export default Homepage;