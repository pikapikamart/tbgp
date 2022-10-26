import { BuilderLayout } from "@/components/layout/builder"
import { StaffActivities } from "@/components/staff/activities"
import { NextPageWithLayout } from "../../_app"


const ActivitiesPage: NextPageWithLayout = () =>{

  return(
    <StaffActivities />
  )
}

ActivitiesPage.getLayout = ( page ) => BuilderLayout(page)
ActivitiesPage.requireAuth = true

export default ActivitiesPage