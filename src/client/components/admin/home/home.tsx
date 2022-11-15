import { SrOnly } from "@/styled/shared/helpers";
import { AdminAccountsSection } from "./accounts";
import { 
  MainContentContainer, 
  MainWrapper } from "./home.styled";
import { AdminVerificationsSection } from "./verifications";
import { ModalProvider } from "@/store/context/modal";


const Home = () => {
  
  return (
    <ModalProvider>
      <MainWrapper key="admin-homepage">
        <MainContentContainer>
          <SrOnly as="h1">Homepage. Manage everything in here</SrOnly>
          <AdminAccountsSection />
          <AdminVerificationsSection />  
        </MainContentContainer>
      </MainWrapper>
    </ModalProvider>
  )
}


export default Home;