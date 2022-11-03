import { BaseModal } from "@/components/shared/modal"
import { useExpansion } from "@/lib/hooks"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { SrOnly } from "@/styled/shared/helpers"
import { useState } from "react"
import { isWriteupHandler } from "../../../utils"
import { AddImageModal } from "../../image"
import { 
  CoverButton, 
  CoverContainer, 
  CoverImage, 
  CoverImageContainer} from "./cover.styled"


const Cover = () => {
  const writeup = useSelectWriteup()
  const staff = useSelectStaff()
  const { isExpanded, handleExpansion } = useExpansion()
  const [ cover, setCover ] = useState({
    image: "",
    caption: ""
  })
  const modalContext = useModalContext()

  const extractImageData = ( image: string, caption: string ) => {
    setCover({
      image,
      caption
    })
    modalContext.removeModal()
    handleExpansion()
  }

  const handleAddModal = () =>{

    if ( writeup.currentPhase!=="graphics" && !isWriteupHandler(writeup, staff.bastionId) )

    handleExpansion()
    modalContext.addModal(
      <BaseModal exit={ handleExpansion }>
        <AddImageModal
          extractData={ extractImageData }
          exit={ () => {
            modalContext.removeModal()
            handleExpansion()
          } } />
      </BaseModal>
    )
  }

  return (
    <CoverContainer>
      { cover.image!=="" && (
        <CoverImageContainer>
          <CoverImage
            src={ cover.image }
            alt={ cover.caption } />
        </CoverImageContainer>
      ) }
      <CoverButton
        onClick={ handleAddModal }
        aria-disabled={ writeup.currentPhase!=="graphics" && !isWriteupHandler(writeup, staff.bastionId) }
        aria-expanded={ isExpanded }>
        <img
          src="/icons/icon-addimage.svg"
          alt="" 
          aria-hidden="true"  />
        <span>
          { cover.image===""? "Story Cover" : "Change cover" }
        </span>
        { writeup.currentPhase!=="graphics" && (
          <SrOnly>Only available in graphics phase</SrOnly>
        ) }
      </CoverButton>
    </CoverContainer>
  )
}


export default Cover