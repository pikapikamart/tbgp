import { InputError } from "@/components/collections/inputs/regular/input.styled"
import { SrOnly } from "@/styled/shared/helpers"
import { 
  isCollaborativePartDone,
  isWriteupReadonly} from "../../utils"
import { WriteHeaderCover } from "./cover"
import { useWriteupHeader } from "./header.hook"
import { 
  HeaderCaption,
  HeaderTitle, 
  HeaderWrapper } from "./header.styled"


const Header = () =>{
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
  
  return (
    <HeaderWrapper 
      as="form"
      onSubmit={ handleFormSubmit }>
      <div>
        <HeaderTitle 
          id="title"
          readOnly = { isWriteupReadonly(writeup, staff.bastionId) || isCollaborativePartDone(writeup, staff.bastionId) }
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
          readOnly = { isWriteupReadonly(writeup, staff.bastionId) || isCollaborativePartDone(writeup, staff.bastionId) }
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


export default Header