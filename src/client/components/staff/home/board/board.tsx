import { SrOnly } from "@/styled/shared/helpers"
import { useBoard } from "./board.hook"
import { 
  BoardWrapper,
  BoardOwner,
  BoardOwnerName,
  BoardMenu,
  BoardInfoList,
  BoardInfoItem,
  BoardDecor } from "./board.styled"
import { getStoryRequests } from "./data"


const Board = () => {
  const {
    isExpanded,
    handleExpansion,
    staff,
    params
  } = useBoard()

  const renderBoardRequest = () =>{
    const requests = getStoryRequests(staff, params)
    const requestsList = requests.map(request => (
      <BoardInfoItem key={ request.name }>
        <span>{ request.data.length } </span>
        { request.name } { request.data.length > 1? "requests" : "request" }
      </BoardInfoItem>
    ))

    return requestsList
  }
  
  return (
    <BoardWrapper>  
      <BoardOwner>
        <BoardOwnerName>
          <BoardDecor
            src="/icons/board-decor.svg"
            alt="" />
          { staff.firstname }
          <span>{ params==="created"? "Story Board" : "Requests Board"  }</span>
        </BoardOwnerName>
      </BoardOwner>
      <BoardMenu 
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
          <SrOnly>{ !isExpanded? "Open board" : "Close board" }</SrOnly>
      </BoardMenu>
      <BoardInfoList>
        { renderBoardRequest() }
      </BoardInfoList>
    </BoardWrapper>
  )
}


export default Board