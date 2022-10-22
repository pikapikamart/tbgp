import { useModalContext } from "@/store/context/modal/modal"
import { ColoredMediumButton } from "@/styled/collections/button"
import { FormBottomControls } from "@/styled/shared/form"
import { useStartStoryRequest } from "../storyRequest.hook"
import { getStoryRequestInformation } from "../utils"


type ControlsProps = {
  hasApplied: boolean,
  request: ReturnType<typeof getStoryRequestInformation>,
  handleApplyStoryRequest: () => void
}

const Controls = ({ hasApplied, request, handleApplyStoryRequest }: ControlsProps) =>{
  const {
    storyRequest,
    bastionId,
    isOwned,
    isMember,
    isAssigned,
    hasRequested,
  } = request
  const { handleStartStoryRequest } = useStartStoryRequest(bastionId)
  const modalContext = useModalContext()
  
  if ( hasRequested!==-1 || hasApplied || isMember!==-1 ) {
    return (
      <FormBottomControls marginTop={ 24 }>
        <ColoredMediumButton 
          colored="grey"
          onClick={ modalContext.removeModal }>Close
        </ColoredMediumButton>
      </FormBottomControls>
    )
  }

  if ( !isOwned ) {
    return (
      <FormBottomControls marginTop={ 24 }>
        { isAssigned.assigned && isAssigned.member!==-1 && (
          <ColoredMediumButton 
            colored="blue"
            onClick={ handleApplyStoryRequest }>Request
          </ColoredMediumButton>
        ) }
        <ColoredMediumButton 
          colored="grey"
          onClick={ modalContext.removeModal }>Close
        </ColoredMediumButton>
      </FormBottomControls>
    )
  }

  return (
    <FormBottomControls marginTop={ 24 }>
      { storyRequest?.members.length!==0 && (
        <ColoredMediumButton 
          colored="blue"
          onClick={ handleStartStoryRequest }>Start
        </ColoredMediumButton>
      ) }
      <ColoredMediumButton 
        colored="grey"
        onClick={ modalContext.removeModal }>Close
      </ColoredMediumButton>
    </FormBottomControls>
  )
}


export default Controls