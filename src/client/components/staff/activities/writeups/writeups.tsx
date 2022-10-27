import { TabInterface } from "@/components/shared/tablist"
import { activitiesParams } from "./data"
import { WriteupsTabContent } from "./tabContent"
import { WriteupsContentContainer } from "./writeups.styled"


const Writeups = () => {

  return (
    <TabInterface paramsPaths={ activitiesParams } >
      <WriteupsContentContainer>
        <WriteupsTabContent tab="writeup" />
      </WriteupsContentContainer>
      <WriteupsContentContainer>
        <WriteupsTabContent tab="revision" />
      </WriteupsContentContainer>
      <WriteupsContentContainer>
        <WriteupsTabContent tab="finalEdit" />
      </WriteupsContentContainer>
      <WriteupsContentContainer>
        <WriteupsTabContent tab="graphics" />
      </WriteupsContentContainer>
      <WriteupsContentContainer>
        <WriteupsTabContent tab="finalization" />
      </WriteupsContentContainer>
    </TabInterface>
  )
}


export default Writeups