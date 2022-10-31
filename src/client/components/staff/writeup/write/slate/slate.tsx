import { useCallback, useMemo } from "react"
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
  const { 
    editor,
    writeup } = useSlate()
  
  const renderElement = useCallback((props: RenderElementProps) => {
    return <RenderElements {...props} />
  }, [])

  const renderLeaf = useCallback(( props: RenderLeafProps ) => {
    return <RenderLeaves { ...props } />
  }, [])
  
  const initialValue = useMemo(() =>{
    if ( writeup.content[0].data.length ) {
      editor.children = writeup.content[0].data
    }

    return initialSlateValue
  }, [writeup.content])
  
  return (
    <SlateComp 
      editor={ editor }
      value={ initialValue }>
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