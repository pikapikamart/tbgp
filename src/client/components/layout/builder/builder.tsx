import { GlobalStyle } from "@/styled/base"
import { LayoutHead } from "../head"
import { DefaultHeader } from "../header";


const DefaultLayout = ( page: React.ReactElement ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      <DefaultHeader type="staff" />
      { page }
    </>
  )
}


export default DefaultLayout;