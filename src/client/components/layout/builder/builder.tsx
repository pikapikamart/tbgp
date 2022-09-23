import { GlobalStyle } from "@/styled/base";
import { LayoutHead } from "../head";


const BuilderLayout = ( page: React.ReactElement ) =>{

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      { page }
    </>
  )
}


export default BuilderLayout;