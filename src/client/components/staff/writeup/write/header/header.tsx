import { InputError } from "@/components/collections/inputs/regular/input.styled"
import { 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  isWriteupEditable, 
  isWriteupHandler, 
  isWriteupMember, 
  isWriteupPhaseEditable,
  isWriteupReadonly} from "../../utils"
import { WriteHeaderCover } from "./cover"
import { CoverContainer, CoverImage } from "./cover/cover.styled"
import { useWriteupHeader } from "./header.hook"
import { 
  HeaderCaption,
  HeaderTitle, 
  HeaderWrapper } from "./header.styled"


type HeaderProps = {

}

const Header = ({}: HeaderProps) =>{
  const {
    writeup,
    staff,
    addFieldRef,
    submitFormRef,
    handleFormSubmit
  } = useWriteupHeader()
  
  if ( !isWriteupReadonly(writeup, staff.bastionId) ) {
    return (
      <HeaderWrapper 
        as="form"
        onSubmit={ handleFormSubmit }>
        <div>
          <HeaderTitle 
            id="title"
            name="title"
            defaultValue={ writeup.content[0].title }
            placeholder="Story title"
            aria-required="true"
            ref={ addFieldRef } />
              <InputError id="error-title">Title should not be empty</InputError>
        </div>
        <div>
          <HeaderCaption 
            id="caption"
            name="caption"
            defaultValue={ writeup.content[0].caption }
            placeholder="Enter story caption"
            aria-required="true"
            ref={ addFieldRef } />
              <InputError id="error-caption">Caption should not be empty</InputError>
        </div>
        <WriteHeaderCover />
        <SrOnly
          as="button"
          hidden={ true }
          aria-hidden="true"
          ref={ submitFormRef }>
        </SrOnly>
      </HeaderWrapper>
    )
  }

  return (
    <HeaderWrapper>
      <HeaderTitle as="h1">{ writeup.content[0].title }</HeaderTitle>
      <HeaderCaption as="p">{ writeup.content[0].caption }</HeaderCaption>
      { writeup.currentPhase==="graphics" && writeup.banner.url!=="" && (
        <CoverContainer>
          <CoverImage
            src={ writeup.banner.url }
            al={ writeup.banner.caption } />
        </CoverContainer>
      ) }
    </HeaderWrapper>
  )
}


export default Header