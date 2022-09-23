import { GlobalStyle } from "@/styled/base";
import { LayoutHead } from "../head";


const AdminLayout = ( page: React.ReactElement ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      { page }
    </>
  )
}


export default AdminLayout;