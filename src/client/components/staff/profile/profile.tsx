import { TabInterface } from "@/components/shared/tablist"
import { trpc } from "@/lib/trpc"
import { ModalProvider } from "@/store/context/modal"
import { useRouter } from "next/router"
import { ProfileArticlesTabContent } from "./articles"
import { ProfileHeaderSection } from "./header"
import { 
  MainContentContainer, 
  MainWrapper } from "./profile.styled"


const profileParams = [
  {
    name: "Articles",
    query: ""
  }
]

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
      <MainWrapper key="staff-profilepage">
        <MainContentContainer>
          <ProfileHeaderSection profile={ query.data.data } />
          <TabInterface
            paramsPaths={ profileParams } 
            isRouting={ false }>
              <ProfileArticlesTabContent writerId={ query.data.data._id as unknown as string } />
          </TabInterface>
        </MainContentContainer>
      </MainWrapper>
    </ModalProvider>
  )
}


export default Profile