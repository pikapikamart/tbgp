import { SrOnly } from "@/styled/shared/helpers"
import { isWriteupHandler } from "../../../utils"
import { useCover } from "./cover.hook"
import { 
  CoverButton, 
  CoverCaption, 
  CoverContainer, 
  CoverImage, 
  CoverImageContainer} from "./cover.styled"


const Cover = () => {
  const {
    writeup,
    staff,
    cover,
    isExpanded,
    handleAddModal
  } = useCover()

  if ( writeup.content[0].phase!=="graphics" ) {
    return <></>
  }

  return (
    <CoverContainer hasImage={ cover.url!=="" }>
      { cover.url!=="" && (
        <CoverImageContainer>
          <CoverImage
            src={ cover.url }
            alt={ cover.caption } />
          { cover.caption!=="" && <CoverCaption>{ cover.caption }</CoverCaption> }
        </CoverImageContainer>
      ) }
      <CoverButton
        onClick={ handleAddModal }
        aria-disabled={ writeup.currentPhase!=="graphics" && isWriteupHandler(writeup, staff.bastionId) }
        aria-expanded={ isExpanded }>
        <img
          src="/icons/icon-addimage.svg"
          alt="" 
          aria-hidden="true"  />
        <span>
          { cover.url===""? "Story Cover" : "Change cover" }
        </span>
        { writeup.currentPhase!=="graphics" && (
          <SrOnly>Only available in graphics phase</SrOnly>
        ) }
      </CoverButton>
    </CoverContainer>
  )
}


export default Cover