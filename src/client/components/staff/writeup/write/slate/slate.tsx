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
import { initialSlateValue } from "./data"
import { slateKeyDown } from "./utils"
import { useSlate } from "./slate.hook"


const Slate = () => {
  const { editor } = useSlate()
  
  const renderElement = useCallback((props: RenderElementProps) => {
    return <RenderElements {...props} />
  }, [])

  const renderLeaf = useCallback(( props: RenderLeafProps ) => {
    return <RenderLeaves { ...props } />
  }, [])

  return (
    <SlateComp 
      editor={ editor }
      value={ initialSlateValue }>
        <SlateToolbar />
        <Editable
          placeholder="Enter your story..."
          renderElement={ renderElement }
          renderLeaf={ renderLeaf }
          onKeyDown={ event => slateKeyDown(event, editor) } />
    </SlateComp>
  )
}


export default Slate