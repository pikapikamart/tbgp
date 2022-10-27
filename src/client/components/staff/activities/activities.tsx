import { 
  DefaultText, 
  HeadingVSmall } from "@/styled/collections/text"
import { 
  MainContentContainer, 
  MainHeadingContainer, 
  MainWrapper } from "./activities.styled"
import { WriteupsSection } from "./writeups"


const Activities = () =>{

  return (
    <MainWrapper>
      <MainContentContainer>
        <MainHeadingContainer>
          <HeadingVSmall as="h1">Activities</HeadingVSmall>
          <DefaultText>See what's everybody's doing and take tasks.</DefaultText>
        </MainHeadingContainer>
        <WriteupsSection />
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Activities