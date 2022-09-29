import { DefaultText } from "@/styled/shared/collection";
import { 
  AccountsHeading, 
  AccountsWrapper } from "./accounts.styled";
import { AccountsBastionIdList } from "./bastionids";


const Accounts = () => {

  return (
    <AccountsWrapper>
      <AccountsHeading>Accounts</AccountsHeading>
      <DefaultText>Expand your team by generating bastion id for them to use</DefaultText>
      <AccountsBastionIdList />
    </AccountsWrapper>
  )
}


export default Accounts;