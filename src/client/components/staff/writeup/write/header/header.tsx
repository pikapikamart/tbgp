import { InputError } from "@/components/collections/inputs/regular/input.styled"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  isWriteupGraphicsAvailable, 
  isWriteupReadonly} from "../../utils"
import { WriteHeaderCover } from "./cover"
import { 
  CoverCaption, 
  CoverContainer, 
  CoverImage } from "./cover/cover.styled"
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
    handleFormSubmit,
    handleTextareaResize,
    titleRef,
    captionRef,
    handleEmitTitle,
    handleEmitCaption
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
            rows={ 1 }
            autoComplete="off"
            onChange={ handleEmitTitle }
            onInput={ handleTextareaResize }
            aria-required="true"
            ref={ el => {
              el? el.setAttribute("style", `height: ${ el.scrollHeight }px; overflow-y: hidden;`) : null
              addFieldRef(el)
              titleRef.current = el
            } } />
              <InputError id="error-title">Title should not be empty</InputError>
        </div>
        <div>
          <HeaderCaption 
            id="caption"
            name="caption"
            defaultValue={ writeup.content[0].caption }
            placeholder="Enter story caption"
            rows={ 1 }
            autoComplete="off"
            onChange={ handleEmitCaption }
            onInput={ handleTextareaResize }
            aria-required="true"
            ref={ el => {
              el? el.setAttribute("style", `height: ${ el.scrollHeight }px; overflow-y: hidden;`) : null
              addFieldRef(el)
              captionRef.current = el
            } } />
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
      { isWriteupGraphicsAvailable(writeup) && writeup.banner.url!=="" && (
        <CoverContainer hasImage={ true }>
          <CoverImage
            src={ writeup.banner.url }
            alt={ writeup.banner.caption } />
          { writeup.banner.caption!=="" && <CoverCaption>{ writeup.banner.caption }</CoverCaption> }
        </CoverContainer>
      ) }
    </HeaderWrapper>
  )
}


export default Header