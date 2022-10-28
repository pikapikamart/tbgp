import { TabInterface } from "@/components/shared/tablist"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { 
  isEditorStaffState, 
  isFullStaffState } from "@/store/slices/staff.slice"
import { WriteupsContentContainer } from "../../activities/writeups/writeups.styled"
import { 
  editorWritingsParams, 
  writingsParams } from "./data"
import { WriteupsTabContent } from "./tabContent"


const Writeups = () => {
  const staff = useSelectStaff()

  if ( !isFullStaffState(staff) ) {
    return (
      <></>
    )
  }

  return (
    <TabInterface paramsPaths={ isEditorStaffState(staff)? editorWritingsParams : writingsParams }>
      <WriteupsContentContainer>
        <WriteupsTabContent writeups={ staff.writeups.solo } />
      </WriteupsContentContainer>
      <WriteupsContentContainer>
        <WriteupsTabContent writeups={ staff.writeups.collaborated } />
      </WriteupsContentContainer>
      { isEditorStaffState(staff) && (
        <WriteupsContentContainer>
          <WriteupsTabContent writeups={ staff.writeups.task } />
        </WriteupsContentContainer>
      ) }
    </TabInterface>
  )
}


export default Writeups