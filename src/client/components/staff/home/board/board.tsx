import { useExpansion } from "@/lib/hooks"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { SrOnly } from "@/styled/shared/helpers"
import { useRouter } from "next/router"
import { 
  BoardWrapper,
  BoardOwner,
  BoardOwnerName,
  BoardMenu,
  BoardInfoList,
  BoardInfoItem,
  BoardDecor
   } from "./board.styled"
import { getStoryRequests } from "./data"


const Board = () => {
  const query = useRouter().query
  const { isExpanded, handleExpansion } = useExpansion()
  const staff = useSelectStaff()

  const renderBoardRequest = () =>{
    const requests = getStoryRequests(staff)
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
          <span>
            { query["created"]? "Story Board" : "Requests Board"  }
          </span>
        </BoardOwnerName>
      </BoardOwner>
      <BoardMenu 
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
        <SrOnly>{ !isExpanded? "Open board" : "Close board" }</SrOnly>
      </BoardMenu>
      <BoardInfoList>
        { query["created"]? <></> : renderBoardRequest() }
      </BoardInfoList>
    </BoardWrapper>
  )
}


export default Board