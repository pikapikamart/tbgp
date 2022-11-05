import { useSelectWriteup } from "@/lib/hooks/store.hooks"
import { ColoredMediumButton } from "@/styled/collections/button"
import { isWriteupEditable } from "../../../utils"
import { ControlsUpdates } from "../../controls.styled"
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
      <ColoredMediumButton
        colored="blue"
        onClick={ handleSubmissionModal }
        aria-expanded={ submitModal }>Submit
      </ColoredMediumButton>
    </ControlsUpdates>
  )
}


export default Solo