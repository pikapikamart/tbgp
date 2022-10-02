import { useAppSelector } from "@/lib/hooks/store.hooks";
import { selectAdminBastionIds } from "@/store/slices/admin.slice";
import { 
  BastionIdsWrapper,
  BastionIdListOption,
  BastionIdListButton } from "./bastionids.styled";


const BastionIds = () => {
  const bastionIds = useAppSelector(selectAdminBastionIds)

  const renderBastionIdList = () => {
    const sampleList = bastionIds.map(id => {
      return (
        <BastionIdListOption key={ id }>
          <BastionIdListButton>{ id }</BastionIdListButton>
        </BastionIdListOption>
      )
    })

    return sampleList
  }

  return (
    <BastionIdsWrapper>
      { renderBastionIdList() }
    </BastionIdsWrapper>
  )
}


export default BastionIds;