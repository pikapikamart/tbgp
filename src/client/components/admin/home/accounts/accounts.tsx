import { useAppSelector } from "@/lib/hooks/store.hooks";
import { 
  DefaultText, 
  DarkLongRoundButton } from "@/styled/shared/collection";
import { CenterContent } from "@/styled/shared/helpers";
import { HomeFrameHeading } from "../home.styled";
import { useBastionIdCreation } from "./accounts.hook";
import { AccountsWrapper } from "./accounts.styled";
import { AccountsBastionIdList } from "./bastionids";


const Accounts = () => {
  const bastionIds = useAppSelector(state => state.admin.bastionIds);
  const { handleIdCreation } = useBastionIdCreation()

  return (
    <AccountsWrapper>
      <HomeFrameHeading>Accounts</HomeFrameHeading>
      <DefaultText>Expand your team by generating bastion id for them to use</DefaultText>
      <AccountsBastionIdList />
      <CenterContent>
        <DarkLongRoundButton 
          onClick={ handleIdCreation }
          aria-disabled={ bastionIds.length===3? "true" : "false" }>Generate Id</DarkLongRoundButton>
      </CenterContent>
    </AccountsWrapper>
  )
}


export default Accounts;