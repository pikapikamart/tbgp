import { useAppSelector } from "@/lib/hooks/store.hooks";
import { selectAdminBastionIds } from "@/store/slices/admin.slice";
import { 
  BastionIdsWrapper,
  BastionIdListOption } from "./bastionids.styled";
import { BastionIdButton } from "./button";


const BastionIds = () => {
  const bastionIds = useAppSelector(selectAdminBastionIds)

  const renderBastionIdList = () => {
    const sampleList = bastionIds.map(id => {
      return (
        <BastionIdListOption key={ id }>
          <BastionIdButton id={ id } /> 
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