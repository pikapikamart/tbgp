import { SettingsForm } from "@/components/collections/forms/settings"
import { useSetupStaff } from "@/lib/hooks/store.hooks"
import { HeadingLarge } from "@/styled/collections/text"
import { 
  MainContentContainer, 
  MainWrapper } from "./settings.styled"


const Settings = () => {
  const { staff } = useSetupStaff()

  if ( !staff.username ) {
    return <>spinner</>
  }

  return (
    <MainWrapper>
      <MainContentContainer>
        <HeadingLarge>Edit Profile</HeadingLarge>
        <SettingsForm />
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Settings