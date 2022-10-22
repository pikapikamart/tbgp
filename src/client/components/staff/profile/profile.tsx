import { trpc } from "@/lib/trpc"
import { ModalProvider } from "@/store/context/modal"
import { useRouter } from "next/router"
import { ProfileHeaderSection } from "./header"
import { 
  MainContentContainer, 
  MainWrapper } from "./profile.styled"


const Profile = () =>{
  const router = useRouter()
  const query = trpc.useQuery(["staff.get", router.query["profile"] as string], {
    refetchOnWindowFocus: false
  })

  if ( query.isLoading ) {
    return <>Spinner</>
  }

  if ( query.isError || !query.data ) {
    return <>Staff not found</>
  }

  return (
    <ModalProvider>
      <MainWrapper>
        <MainContentContainer>
          <ProfileHeaderSection profile={ query.data.data } />
        </MainContentContainer>
      </MainWrapper>
    </ModalProvider>
  )
}


export default Profile