import { GlobalStyle } from "@/styled/base"
import { LayoutHead } from "../head"


const DefaultLayout = ( page: React.ReactElement ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      { page }
    </>
  )
}


export default DefaultLayout;