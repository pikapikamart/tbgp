import { 
  DefaultText, 
  HeadingVSmall } from "@/styled/collections/text"
import { 
  MainContentContainer, 
  MainHeadingContainer, 
  MainWrapper } from "@/components/staff/activities/activities.styled"


const Writings = () =>{

  return (
    <MainWrapper>
      <MainContentContainer>
        <MainHeadingContainer>
          <HeadingVSmall as="h1">Writings</HeadingVSmall>
          <DefaultText>See what you've been up to and start writing your requested stories.</DefaultText>
        </MainHeadingContainer>
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Writings