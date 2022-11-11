import { GlobalStyle } from "@/styled/base"
import { MainFooter } from "../footer";
import { LayoutHead } from "../head"
import { MainHeader } from "../header/main";


const DefaultLayout = ( page: React.ReactElement ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      <MainHeader />
      { page }
      <MainFooter />
    </>
  )
}


export default DefaultLayout;