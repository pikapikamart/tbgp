import { BuilderLayout } from "@/components/layout/builder"
import { StaffProfile } from "@/components/staff/profile"
import { NextPageWithLayout } from "../_app"


const ProfilePage: NextPageWithLayout = () =>{

  return (
    <StaffProfile />
  )
}

ProfilePage.getLayout = ( page ) => BuilderLayout(page)


export default ProfilePage