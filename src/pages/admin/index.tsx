import { AdminHomeSection } from "@/components/admin/home";
import { AdminLayout } from "@/components/layout/admin";
import { NextPageWithLayout } from "../_app";


const AdminHomepage: NextPageWithLayout = () => {

  return (
    <AdminHomeSection />
  )
}


AdminHomepage.getLayout = ( page ) => AdminLayout(page)


export default AdminHomepage;