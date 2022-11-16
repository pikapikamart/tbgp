import { useSelectWriteup } from "@/lib/hooks/store.hooks"
import { isWriteupEditable } from "../../../utils"
import { ControlsUpdates } from "../../controls.styled"
import { SubmitWriteupOption } from "../options/submit"
import { SaveWriteupControl } from "../save"
import { useSolo } from "./solo.hook"


const Solo = () => {
  const {
    submitModal,
    handleSubmissionModal
  } = useSolo()
  const writeup = useSelectWriteup()

  if ( !isWriteupEditable(writeup) ) {
    return <></>
  }

  return (
    <ControlsUpdates>
      <SaveWriteupControl />
      <SubmitWriteupOption
        onClick={ handleSubmissionModal }
        isExpanded={ submitModal } />
    </ControlsUpdates>
  )
}


export default Solo