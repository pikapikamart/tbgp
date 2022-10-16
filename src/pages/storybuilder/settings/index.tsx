import { BuilderLayout } from "@/components/layout/builder";
import { StaffSettings } from "@/components/staff/settings";
import { NextPageWithLayout } from "@/pages/_app";


const SettingsPage: NextPageWithLayout = () =>{

  return (
    <StaffSettings />
  )
}

SettingsPage.getLayout = ( page ) => BuilderLayout(page)


export default SettingsPage