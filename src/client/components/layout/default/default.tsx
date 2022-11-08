import { GlobalStyle } from "@/styled/base"
import { LayoutHead } from "../head"
import { MainHeader } from "../header/main";


const DefaultLayout = ( page: React.ReactElement ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      <MainHeader />
      { page }
    </>
  )
}


export default DefaultLayout;