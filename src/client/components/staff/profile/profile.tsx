import { TabInterface } from "@/components/shared/tablist"
import { trpc } from "@/lib/trpc"
import { ModalProvider } from "@/store/context/modal"
import { useRouter } from "next/router"
import { ProfileArticlesTabContent } from "./articles"
import { ProfileHeaderSection } from "./header"
import { 
  MainContentContainer, 
  MainWrapper } from "./profile.styled"
import { AnimatePresence } from "framer-motion"
import { LoadingSpinner } from "@/components/shared/spinner"
import { FourOhFour } from "@/components/shared/404"


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
  
  if ( query.isError ) {
    return (
      <FourOhFour>Try checking the username of the writer for a better result!</FourOhFour>
    )
  }

  return (
    <ModalProvider>
      <AnimatePresence exitBeforeEnter>
        { (query.isLoading || !query.data) && <LoadingSpinner key="staff-profile-spinner" /> }
        { query.data && (
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
        ) }
      </AnimatePresence>
    </ModalProvider>
  )
}


export default Profile