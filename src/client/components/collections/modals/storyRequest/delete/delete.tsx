import { useTrapFocus } from "@/lib/hooks"
import { EmptyFunction } from "@/store/context/modal/modal"
import { ColumCenterCenter } from "@/styled/shared/helpers"
import { 
  ModalHeading, 
  ModalWrapper } from "@/styled/shared/modal"
import { VerificationDescription } from "../../verifyStaff/verifyStaff.styled"
import { DeleteOption } from "./delete.styled"


type DeleteProps = {
  exit: EmptyFunction,
  handleConfirmDelete: EmptyFunction
}

const Delete = ({ exit, handleConfirmDelete }: DeleteProps) =>{
  const [ registerControl, registerTrapContainer ] = useTrapFocus()

  return (
    <ModalWrapper
      size="small"
      onKeyDown={ registerTrapContainer }>
        <ModalHeading
          as="h3" 
          size="medium">Continue deleting?
        </ModalHeading>
        <VerificationDescription>This will remove all the members and the requests made by writers in this story request</VerificationDescription>
      <ColumCenterCenter>
        <DeleteOption
          colored="red"
          ref={ registerControl }
          onClick={ handleConfirmDelete }>Delete
        </DeleteOption>
        <DeleteOption
          colored="grey"
          ref={ registerControl }
          onClick={ exit }>Cancel
        </DeleteOption>
      </ColumCenterCenter>
    </ModalWrapper>
  )
}


export default Delete