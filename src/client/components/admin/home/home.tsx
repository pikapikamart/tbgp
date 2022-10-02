import { useAppDispatch } from "@/lib/hooks/store.hooks";
import { trpc } from "@/lib/trpc";
import { setAdmin } from "@/store/slices/admin.slice";
import { SrOnly } from "@/styled/shared/helpers";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { AccountsSection } from "./accounts";
import { MainWrapper } from "./home.styled";


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
    <MainWrapper>
      <SrOnly>Homepage. Manage everything in here</SrOnly>
      <AccountsSection />
    </MainWrapper>
  )
}


export default Home;