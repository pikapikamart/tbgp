import { ModalProvider } from "@/store/context/modal"
import { SrOnly } from "@/styled/shared/helpers"
import { StaffBoard } from "./board"
import { 
  MainContentContainer, 
  MainWrapper } from "./home.styled"


const Home = () =>{

  return (
    <ModalProvider>
      <MainWrapper>
        <MainContentContainer>
          <SrOnly as="h1">See all story requests</SrOnly>
          <StaffBoard />
        </MainContentContainer>
      </MainWrapper>
    </ModalProvider>
  )
}


export default Home