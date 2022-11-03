import { useExpansion } from "@/lib/hooks"
import { SrOnly } from "@/styled/shared/helpers"
import { useSlateStatic } from "slate-react"
import { 
  insertImage } from "../../utils"
import { 
  MarkButton, 
  ToolbarItem } from "../toolbar.styled"
import ImageIcon from "@/public/icons/icon-addImage.svg"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { BaseModal } from "@/components/shared/modal"
import { AddImageModal } from "../../../image"
import { isWriteupHandler } from "@/components/staff/writeup/utils"


const Image = () =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const editor = useSlateStatic()
  const staff = useSelectStaff()
  const writeup = useSelectWriteup()
  const modalContext = useModalContext()

  const handleExtractImage = ( image: string, caption: string ) => {
    if ( !image ) {
      return 
    }
    modalContext.removeModal()
    handleExpansion()
    insertImage(editor, image, caption)
  }

  const handleAddImage = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) =>{
    
    if ( writeup.currentPhase!=="graphics" && isWriteupHandler(writeup, staff.bastionId) ) {
      return
    }

    modalContext.addModal(
      <BaseModal exit={ handleExpansion }>
        <AddImageModal
          extractData={ handleExtractImage }
          exit={ () =>{
            modalContext.removeModal()
            handleExpansion()
          } } />
      </BaseModal>
    )
  }

  return (
    <ToolbarItem>
      <MarkButton
        onClick={ handleAddImage }
        aria-expanded={ isExpanded }
        aria-disabled={ writeup.currentPhase!=="graphics" && isWriteupHandler(writeup, staff.bastionId) }>
        <ImageIcon />
        <SrOnly>add an image</SrOnly>
      </MarkButton>
    </ToolbarItem>
  )
}


export default Image