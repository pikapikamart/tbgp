import { useAppSelector } from "@/lib/hooks/store.hooks"
import { selectAdminVerifications } from "@/store/slices/admin.slice"
import { 
  Position, 
  PositionsWrapper } from "./position.styled"


const Positions = () => {
  const verifications = useAppSelector(selectAdminVerifications)

  const renderPositions = () => {
    const positions = verifications.map(position => (
      <Position key={ position.bastionId }>

      </Position>
    ))

    return positions
  }

  return (
    <PositionsWrapper>
      { renderPositions() }
    </PositionsWrapper>
  )
}


export default Positions;