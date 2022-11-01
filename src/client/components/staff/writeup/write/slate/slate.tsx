import { useCallback } from "react"
import {
  Slate as SlateComp,
  Editable,
  RenderElementProps,
  RenderLeafProps
} from "slate-react"
import { RenderElements } from "./element"
import { RenderLeaves } from "./leaf"
import { SlateToolbar } from "./toolbar"
import { slateKeyDown } from "./utils"
import { useSlate } from "./slate.hook"
import { useSelectStaff } from "@/lib/hooks/store.hooks"
import { isWriteupReadonly } from "../../utils"


const Slate = () => {
  const { 
    editor,
    initialValue,
    writeup } = useSlate()
  const staff = useSelectStaff()
  
  const renderElement = useCallback((props: RenderElementProps) => {
    return <RenderElements {...props} />
  }, [])

  const renderLeaf = useCallback(( props: RenderLeafProps ) => {
    return <RenderLeaves { ...props } />
  }, [])
  
  return (
    <SlateComp 
      editor={ editor }
      value={ initialValue }>
        <SlateToolbar />
        <Editable
          readOnly={ isWriteupReadonly(writeup, staff.bastionId) }
          placeholder="Enter your story..."
          renderElement={ renderElement }
          renderLeaf={ renderLeaf }
          onKeyDown={ event => slateKeyDown(event, editor) } />
    </SlateComp>
  )
}


export default Slate