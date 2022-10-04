import { useAppDispatch } from "@/lib/hooks/store.hooks";
import { trpc } from "@/lib/trpc";
import { setAdmin } from "@/store/slices/admin.slice";
import { SrOnly } from "@/styled/shared/helpers";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { AccountsSection } from "./accounts";
import { 
  MainContentContainer, 
  MainWrapper } from "./home.styled";
import { VerificationsSection } from "./verifications";
import { AdminContext } from "./home.context";
import { BaseModal } from "@/components/shared/modal";
import { VerificationModal } from "@/components/shared/modal/admin/verification";


const Home = () => {
  const { data, status, refetch } = trpc.useQuery(["admin.get-profile"], {
    refetchOnWindowFocus: false,
    enabled: false
  })
  const { data: token } = useSession()
  const dispatch = useAppDispatch()
  const adminContext = useContext(AdminContext)

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
      <MainWrapper>
        <MainContentContainer>
          <SrOnly as="h1">Homepage. Manage everything in here</SrOnly>
          <AccountsSection />
          <VerificationsSection />  
        </MainContentContainer>
      </MainWrapper>
      { adminContext?.verification && (
        <BaseModal>
          <VerificationModal />
        </BaseModal>
      )}
    </>
  )
}


export default Home;