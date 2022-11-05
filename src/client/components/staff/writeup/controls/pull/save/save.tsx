import { ColoredMediumButton } from "@/styled/collections/button"
import { SaveControlToast } from "../../controls.styled"
import { useSaveWriteup } from "./save.hook"
import SaveSvg from "@/public/icons/icon-saved-toast.svg"


export const Save = () =>{
  const { 
    handleWriteupSave,
    isSuccess } = useSaveWriteup()

  return (
    <>
      <ColoredMediumButton
        colored="borderGray"
        onClick={ handleWriteupSave }>Save
      </ColoredMediumButton>
      { isSuccess && (
        <SaveControlToast>
          <SaveSvg aria-hidden="true" />
          Saved
        </SaveControlToast>
      ) }
    </>
  )
}


export default Save