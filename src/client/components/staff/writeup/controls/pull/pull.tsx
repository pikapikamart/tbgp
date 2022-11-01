import { 
  isWriteupCollaborative,
  isWriteupMember } from "../../utils"
import { CollaborativeControl } from "./collaborative"
import { SoloControl } from "./solo"
import { isEditorStaffState } from "@/store/slices/staff.slice"
import { TaskControl } from "./task"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"


const Pull = () =>{
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()

  if ( writeup.currentPhase==="writeup" && isWriteupMember(writeup, staff.bastionId) ) {
    if ( isWriteupCollaborative(writeup) ) {
      return <CollaborativeControl />
    } 

    return <SoloControl />
  }

  if ( isEditorStaffState(staff) ) {
    return <TaskControl />
  }

  return (
    <></>
  )
}


export default Pull