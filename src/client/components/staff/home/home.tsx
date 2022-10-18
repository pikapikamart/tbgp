import { ModalProvider } from "@/store/context/modal"
import { SrOnly } from "@/styled/shared/helpers"
import { StaffBoardSection } from "./board"
import { 
  MainContentContainer, 
  MainWrapper } from "./home.styled"
import { StaffRequestsSection } from "./requests"


const Home = () =>{

  return (
    <ModalProvider>
      <MainWrapper>
        <MainContentContainer>
          <SrOnly as="h1">See all story requests</SrOnly>
          <StaffBoardSection />
          <StaffRequestsSection />
        </MainContentContainer>
      </MainWrapper>
    </ModalProvider>
  )
}


export default Home