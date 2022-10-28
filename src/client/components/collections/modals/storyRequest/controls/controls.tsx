import { RegisterControl } from "@/lib/hooks"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { ColoredMediumButton } from "@/styled/collections/button"
import { FormBottomControls } from "@/styled/shared/form"
import { MarginLeft } from "@/styled/shared/helpers"
import { 
  useApplyStoryRequest, 
  useStartStoryRequest } from "./controls.hook"
import { useTrackedStoryRequest } from "../storyRequest.tracked"


type ControlsProps = {
  registerControl: RegisterControl,
  handleDeleteStoryRequest: () => void
}

const Controls = ({ registerControl, handleDeleteStoryRequest }: ControlsProps) =>{
  const staff = useSelectStaff()
  const {
    storyRequest,
    hasRequested,
    isOwned,
    isAssigned,
    isAssignedMember,
    isMember } = useTrackedStoryRequest()
  const { handleApplyStoryRequest } = useApplyStoryRequest()
  const { handleStartStoryRequest } = useStartStoryRequest(staff.bastionId)
  const modalContext = useModalContext()
  
  if ( hasRequested || isMember ) {
    return (
      <FormBottomControls marginTop={ 24 }>
        <ColoredMediumButton
          ref={ registerControl } 
          colored="grey"
          onClick={ modalContext.removeModal }>Close
        </ColoredMediumButton>
      </FormBottomControls>
    )
  }

  if ( !isOwned ) {
    return (
      <FormBottomControls marginTop={ 24 }>
        { ((isAssigned && isAssignedMember) || !isAssigned) && (
          <ColoredMediumButton 
            colored="blue"
            onClick={ handleApplyStoryRequest }>Request
          </ColoredMediumButton>
        ) }
        <ColoredMediumButton
          ref={ registerControl } 
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
      <MarginLeft pause={ storyRequest?.members.length===0 }>
        <ColoredMediumButton 
          ref={ registerControl } 
          colored="red"
          onClick={ handleDeleteStoryRequest }>Delete
        </ColoredMediumButton>
      </MarginLeft>
    </FormBottomControls>
  )
}


export default Controls