import { SettingsForm } from "@/components/collections/forms/settings"
import { HeadingLarge } from "@/styled/collections/text"
import { 
  MainContentContainer, 
  MainWrapper } from "./settings.styled"


const Settings = () => {

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