import { GlobalStyle } from "@/styled/base"
import { LayoutHead } from "../head"
import { DefaultHeader } from "../header";


const DefaultLayout = ( page: React.ReactElement ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      <DefaultHeader type="admin" />
      { page }
    </>
  )
}


export default DefaultLayout;