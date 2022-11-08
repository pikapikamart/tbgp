import { DefaultLayout } from "@/components/layout/default";
import { Home } from "@/components/main/home";
import { NextPageWithLayout } from "./_app";


const Homepage: NextPageWithLayout = () =>{

  return (
    <Home />
  )
}

Homepage.getLayout = ( page ) => DefaultLayout(page)


export default Homepage;