import { GlobalStyle } from "@/styled/base";
import { LayoutHead } from "../head";
import { HeaderLayout } from "./header";


const AdminLayout = ( page: React.ReactElement ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      <HeaderLayout />
      { page }
    </>
  )
}


export default AdminLayout;