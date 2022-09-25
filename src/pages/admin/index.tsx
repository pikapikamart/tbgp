import { AdminLayout } from "@/components/layout/admin";
import { NextPageWithLayout } from "../_app";


const AdminHomepage: NextPageWithLayout = () => {

  return (
    <></>
  )
}


AdminHomepage.getLayout = ( page ) => AdminLayout(page)


export default AdminHomepage;