import { SrOnly } from "@/styled/shared/helpers";
import { AdminAccountsSection } from "./accounts";
import { 
  MainContentContainer, 
  MainWrapper } from "./home.styled";
import { AdminVerificationsSection } from "./verifications";
import { ModalProvider } from "@/store/context/modal";
import { useSetupAdmin } from "./home.hooks";


const Home = () => {
  useSetupAdmin()
  
  return (
    <ModalProvider>
      <MainWrapper>
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