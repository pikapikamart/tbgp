import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { ColoredMediumButton } from "@/styled/collections/button"
import { ControlsUpdates } from "../controls.styled"
import { 
  isWriteupEditable, 
  isWriteupMember } from "../../utils"


const Pull = () =>{
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()
  
  if ( writeup.currentPhase==="writeup" && isWriteupMember(writeup, staff.bastionId) ) {
    if ( isWriteupEditable(writeup) ) {
      return (
        <ControlsUpdates>
          <ColoredMediumButton
            colored="borderGray">Save</ColoredMediumButton>
          <ColoredMediumButton
            colored="blue">Submit</ColoredMediumButton>
        </ControlsUpdates>
      )
    }
  }

  return (
    <></>
  )
}


export default Pull