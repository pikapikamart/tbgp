import { AdminHome } from "@/components/admin/home";
import { AdminLayout } from "@/components/layout/admin";
import { NextPageWithLayout } from "../_app";


const AdminHomepage: NextPageWithLayout = () => {

  return (
    <AdminHome />
  )
}


AdminHomepage.getLayout = ( page ) => AdminLayout(page)


export default AdminHomepage;