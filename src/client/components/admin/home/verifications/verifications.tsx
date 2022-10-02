import { TabInterface } from "@/components/shared/tablist";
import { DefaultText } from "@/styled/shared/collection";
import { 
  HomeFrameHeading, 
  HomeFrameWrapper } from "../home.styled";
import { VerificationsPositions } from "./positions";


const Verifications = () =>{

  return (
    <HomeFrameWrapper>
      <HomeFrameHeading>Positions</HomeFrameHeading>
      <DefaultText>Verify bastion members position requests</DefaultText>
      <TabInterface selectionNames={["Verifications", "test"]}>
        <VerificationsPositions />
      </TabInterface>
    </HomeFrameWrapper>
  )
}


export default Verifications;