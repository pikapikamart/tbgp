import { TabInterface } from "@/components/shared/tablist";
import { DefaultText } from "@/styled/collections/text";
import { HomeFrameHeading } from "../home.styled";
import { VerificationsList } from "./list";
import { VerificationsWrapper } from "./verifications.styled";
import { verificationsParams } from "./data"
import { StaffsList } from "./staffs";


const Verifications = () =>{

  return (
    <VerificationsWrapper>
      <HomeFrameHeading>Positions</HomeFrameHeading>
      <DefaultText>Verify bastion members position requests</DefaultText>
      <TabInterface paramsPaths={ verificationsParams }>
        <VerificationsList />
        <StaffsList />
      </TabInterface>
    </VerificationsWrapper>
  )
}


export default Verifications;