import { 
  useCallback, 
  useMemo} from "react"
import { createEditor } from "slate"
import {
  Slate as SlateComp,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps
} from "slate-react"
import { withHistory } from "slate-history"
import { RenderElements } from "./element"
import { RenderLeaves } from "./leaf"
import { SlateToolbar } from "./toolbar"
import { initialSlateValue } from "./data"
import { slateKeyDown, withInlines } from "./utils"


const Slate = () => {
  const editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), [])
  
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