import { useFocusPositionList } from "@/lib/hooks"
import { useAppSelector } from "@/lib/hooks/store.hooks"
import { selectAdminVerifications } from "@/store/slices/admin.slice"
import { useContext } from "react"
import { AdminContext } from "../../home.context"
import { 
  Position, 
  PositionListWrapper, 
  PositionOption, 
  PositionRequester, 
  PositionRole } from "./position.styled"


export const sanitizePosition = ( position: string ) => {
  const lowercasedPosition = position.split(/(?=[A-Z])/).map(item => item.toLowerCase())

  return lowercasedPosition.join(" ")
}

const Positions = () => {
  const verifications = useAppSelector(selectAdminVerifications)
  const adminContext = useContext(AdminContext)
  const { positionListRef } = useFocusPositionList()

  const renderPositions = () => {
    const positions = verifications.map(position => (
      <Position key={ position.bastionId }>
        <PositionRequester>{ position.fullname }</PositionRequester>
        <PositionRole>
          Requesting as:
          <span>{ sanitizePosition(position.position) }</span>
        </PositionRole>
        <PositionOption 
          bgColor="blue"
          type="button"
          onClick={ () => adminContext?.addVerification({ data: position, type: "accept" }) } >Accept
        </PositionOption>
        <PositionOption 
          bgColor="red"
          type="button"
          onClick={ () => adminContext?.addVerification({ data: position, type: "reject" }) } >Reject
        </PositionOption>
      </Position>
    ))

    return positions
  }

  return (
    <>
      <PositionListWrapper 
        ref={ positionListRef }
        tabIndex={ -1 }>
        { renderPositions() }
      </PositionListWrapper>
    </>
  )
}


export default Positions;