import { TabInterface } from "@/components/shared/tablist";
import { DefaultText } from "@/styled/collections/text";
import { HomeFrameHeading } from "../home.styled";
import { VerificationsList } from "./list";
import { VerificationsWrapper } from "./verifications.styled";


const Verifications = () =>{

  return (
    <VerificationsWrapper>
      <HomeFrameHeading>Positions</HomeFrameHeading>
      <DefaultText>Verify bastion members position requests</DefaultText>
      <TabInterface selectionNames={["Verifications"]}>
        <VerificationsList />
      </TabInterface>
    </VerificationsWrapper>
  )
}


export default Verifications;