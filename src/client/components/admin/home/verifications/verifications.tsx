import { TabInterface } from "@/components/shared/tablist";
import { DefaultText } from "@/styled/shared/collection";
import { HomeFrameHeading } from "../home.styled";
import { VerificationsPositions } from "./positions";
import { VerificationsWrapper } from "./verifications.styled";


const Verifications = () =>{

  return (
    <VerificationsWrapper>
      <HomeFrameHeading>Positions</HomeFrameHeading>
      <DefaultText>Verify bastion members position requests</DefaultText>
      <TabInterface selectionNames={["Verifications", "test"]}>
        <VerificationsPositions />
      </TabInterface>
    </VerificationsWrapper>
  )
}


export default Verifications;