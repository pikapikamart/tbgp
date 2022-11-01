import { 
  useAppDispatch, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { setWriteupSlate } from "@/store/slices/writeup.slice"
import { 
  useMemo,
  useEffect,
  useState } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"
import { initialSlateValue } from "./data"
import { withInlines } from "./utils"


export const useSlate = () =>{
  const editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), [])
  const dispatch = useAppDispatch()
  const [ isSlateInvalid, setIsSlateInvalid ] = useState(false)
  const writeup = useSelectWriteup()

  const initialValue = useMemo(() =>{
    if ( writeup.content[0].data.length ) {
      editor.children = writeup.content[0].data
    }

    return initialSlateValue
  }, [writeup.content])

  useEffect(() =>{
    if ( writeup.shouldSave ) {
      if ( editor.children.length===1 && editor.children[0].children[0].text==="" ) {
        setIsSlateInvalid(true)
      } else {
        dispatch(setWriteupSlate(editor.children))
      }
    }
  }, [ writeup.shouldSave ])

  return {
    editor,
    writeup,
    isSlateInvalid,
    initialValue
  }
}