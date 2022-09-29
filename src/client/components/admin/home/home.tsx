import { useAppDispatch } from "@/lib/hooks/store.hooks";
import { trpc } from "@/lib/trpc";
import { setAdmin } from "@/store/slices/admin.slice";
import { SrOnly } from "@/styled/shared/helpers";
import { useEffect } from "react";
import { AccountsSection } from "./accounts";
import { MainWrapper } from "./home.styled";


const Home = () => {
  const { data, status } = trpc.useQuery(["admin.get-profile"])
  const dispatch = useAppDispatch()


  useEffect(() => {
    if ( data && status==="success" ) {
      dispatch(setAdmin(data.data))
    }
  }, [ data, status ] )
  // could use an effect in here to get the admins information
  // and pass down data to props
  // or redux?

  return (
    <MainWrapper>
      <SrOnly>Homepage. Manage everything in here</SrOnly>
      <AccountsSection />
    </MainWrapper>
  )
}


export default Home;