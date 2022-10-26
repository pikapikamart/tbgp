import { TabInterface } from "@/components/shared/tablist"
import { 
  DefaultText, 
  HeadingVSmall } from "@/styled/collections/text"
import { 
  MainContentContainer, 
  MainHeadingContainer, 
  MainWrapper } from "./activities.styled"
import { activitiesParams } from "./data"


const Activities = () =>{

  return (
    <MainWrapper>
      <MainContentContainer>
        <MainHeadingContainer>
          <HeadingVSmall as="h1">Activities</HeadingVSmall>
          <DefaultText>See what's everybody's doing and take tasks.</DefaultText>
          <TabInterface paramsPaths={ activitiesParams } >
            
          </TabInterface>
        </MainHeadingContainer>
      </MainContentContainer>
    </MainWrapper>
  )
}


export default Activities