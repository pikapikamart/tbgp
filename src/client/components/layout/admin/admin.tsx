import { GlobalStyle } from "@/styled/base"
import { LayoutHead } from "../head"
import { DefaultHeader } from "../header";


const DefaultLayout = ( page: React.ReactElement, isEmpty?: boolean ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      { isEmpty? <></> : <DefaultHeader type="admin" /> }
      { page }
    </>
  )
}


export default DefaultLayout;