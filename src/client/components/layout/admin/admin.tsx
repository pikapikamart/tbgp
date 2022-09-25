import { GlobalStyle } from "@/styled/base";
import { LayoutHead } from "../head";
import { AdminHeaderLayout } from "./header";


const AdminLayout = ( page: React.ReactElement ) => {

  return (
    <>
      <LayoutHead />
      <GlobalStyle />
      <AdminHeaderLayout />
      { page }
    </>
  )
}


export default AdminLayout;