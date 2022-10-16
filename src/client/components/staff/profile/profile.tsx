import { useSetupStaff } from "@/lib/hooks/store.hooks"
import { ModalProvider } from "@/store/context/modal"
import { ProfileHeaderSection } from "./header"
import { 
  MainContentContainer, 
  MainWrapper } from "./profile.styled"


const Profile = () =>{
  const { staff } = useSetupStaff()
  // throw user outside

  if ( !staff.username ) {
    return (
      <>sdf</>
    )
  }

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