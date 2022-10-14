import { useAppDispatch } from "@/lib/hooks/store.hooks";
import { trpc } from "@/lib/trpc";
import { setAdmin } from "@/store/slices/admin.slice";
import { SrOnly } from "@/styled/shared/helpers";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { AdminAccountsSection } from "./accounts";
import { 
  MainContentContainer, 
  MainWrapper } from "./home.styled";
import { AdminVerificationsSection } from "./verifications";
import { ModalProvider } from "@/store/context/modal";
import { useSetupAdmin } from "./home.hooks";

// create a hook for useSetupAdmin
// check for authentication bypass
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