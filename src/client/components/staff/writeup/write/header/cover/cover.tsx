import { BaseModal } from "@/components/shared/modal"
import { useExpansion } from "@/lib/hooks"
import { useSelectWriteup } from "@/lib/hooks/store.hooks"
import { useModalContext } from "@/store/context/modal/modal"
import { SrOnly } from "@/styled/shared/helpers"
import { exit } from "process"
import { useState } from "react"
import { AddImageModal } from "../../image"
import { 
  CoverButton, 
  CoverContainer } from "./cover.styled"


const Cover = () => {
  const writeup = useSelectWriteup()
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
      <CoverButton
        onClick={ handleAddModal }
        aria-disabled={ writeup.currentPhase!=="graphics" }
        aria-expanded={ isExpanded }>
        <img
          src="/icons/icon-addimage.svg"
          alt="" 
          aria-hidden="true"  />
        <span>Story Cover</span>
        { writeup.currentPhase!=="graphics" && (
          <SrOnly>Only available in graphics phase</SrOnly>
        ) }
      </CoverButton>
    </CoverContainer>
  )
}


export default Cover