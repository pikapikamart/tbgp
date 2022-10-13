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

// create a hook for useSetupAdmin
// check for authentication bypass
const Home = () => {
  const { data, status, refetch } = trpc.useQuery(["admin.get-profile"], {
    refetchOnWindowFocus: false,
    enabled: false
  })
  const { data: token } = useSession()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if ( data && status==="success" ) {
      dispatch(setAdmin(data.data))
    }
  }, [ data, status ] )

  useEffect(() =>{
    if ( token?.user ) {
      refetch()
    }
  }, [ token ])
  
  return (
    <>
    <ModalProvider>
      <MainWrapper>
        <MainContentContainer>
          <SrOnly as="h1">Homepage. Manage everything in here</SrOnly>
          <AdminAccountsSection />
          <AdminVerificationsSection />  
        </MainContentContainer>
      </MainWrapper>
    </ModalProvider>
    </>
  )
}


export default Home;