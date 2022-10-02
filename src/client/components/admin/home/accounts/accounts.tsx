import { 
  useAppDispatch, 
  useAppSelector } from "@/lib/hooks/store.hooks";
import { trpc } from "@/lib/trpc";
import { addBastionId } from "@/store/slices/admin.slice";
import { 
  DefaultText, 
  DarkLongRoundButton } from "@/styled/shared/collection";
import { CenterContent } from "@/styled/shared/helpers";
import { useEffect } from "react";
import { HomeFrameHeading } from "../home.styled";
import { AccountsWrapper } from "./accounts.styled";
import { AccountsBastionIdList } from "./bastionids";


const Accounts = () => {
  const mutation = trpc.useMutation(["admin.create-bastionId"])
  const bastionIds = useAppSelector(state => state.admin.bastionIds);
  const dispatch = useAppDispatch()

  const handleBastionIdCreation = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    const isDisabled = event.currentTarget.getAttribute("aria-disabled")
    
    if ( isDisabled==="true" ) {

      return
    } 
    mutation.mutate()
  }

  useEffect(() => {
    if ( mutation.isSuccess) {
      dispatch(addBastionId(mutation.data.data))
    }
  }, [ mutation.isSuccess ])

  return (
    <AccountsWrapper>
      <HomeFrameHeading>Accounts</HomeFrameHeading>
      <DefaultText>Expand your team by generating bastion id for them to use</DefaultText>
      <AccountsBastionIdList />
      <CenterContent>
        <DarkLongRoundButton 
          onClick={ handleBastionIdCreation }
          aria-disabled={ bastionIds.length===3? "true" : "false" }>Generate Id</DarkLongRoundButton>
      </CenterContent>
    </AccountsWrapper>
  )
}


export default Accounts;