import { useCallback } from "react"
import {
  Slate as SlateComp,
  Editable,
  RenderElementProps,
  RenderLeafProps } from "slate-react"
import { RenderElements } from "./element"
import { RenderLeaves } from "./leaf"
import { SlateToolbar } from "./toolbar"
import { slateKeyDown } from "./utils"
import { useSlate } from "./slate.hook"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { isWriteupReadonly } from "../../utils"
import { SlateWrapper } from "./slate.styled"


const Slate = () => {
  const { 
    editor,
    initialValue,
    writeup,
    handleSlateEmitter } = useSlate()
  const staff = useSelectStaff()
  
  const renderElement = useCallback((props: RenderElementProps) => {
    return <RenderElements {...props} />
  }, [])

  const renderLeaf = useCallback(( props: RenderLeafProps ) => {
    return <RenderLeaves { ...props } />
  }, [])
  
  return (
    <SlateWrapper>  
      <SlateComp 
        editor={ editor }
        value={ initialValue }
        onChange={ handleSlateEmitter }>
          <SlateToolbar />
          <Editable
            readOnly={ isWriteupReadonly(writeup, staff.bastionId) }
            placeholder="Enter your story..."
            renderElement={ renderElement }
            renderLeaf={ renderLeaf }
            onKeyDown={ event => slateKeyDown(event, editor) } 
            />
      </SlateComp>
    </SlateWrapper>
  )
}


export default Slate