import { 
  useState,
  useCallback } from "react"
import { 
  createEditor, 
  Descendant } from "slate"
import {
  Slate as SlateComp,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps
} from "slate-react"
import { RenderElements } from "./element"
import { RenderLeaves } from "./leaf"
import { SlateToolbar } from "./toolbar"

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Your story...' }],
  },
]

const Slate = () => {
  const [ editor ] = useState(() => withReact(createEditor()))

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
          renderElement={ renderElement }
          renderLeaf={ renderLeaf } />
    </SlateComp>
  )
}


export default Slate