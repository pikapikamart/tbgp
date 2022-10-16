import { ModalProvider } from "@/store/context/modal"
import { ProfileHeaderSection } from "./header"
import { 
  MainContentContainer, 
  MainWrapper } from "./profile.styled"


const Profile = () =>{

  return (
    <ModalProvider>
      <MainWrapper>
        <MainContentContainer>
          <ProfileHeaderSection />
        </MainContentContainer>
      </MainWrapper>
    </ModalProvider>
  )
}


export default Profile