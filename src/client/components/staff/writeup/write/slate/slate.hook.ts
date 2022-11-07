import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { Events } from "@/pages/storybuilder/writeup/[writeup]/phase.hook"
import { setWriteupSlate } from "@/store/slices/writeup.slice"
import { 
  useMemo,
  useEffect,
  useState, 
  useRef} from "react"
import { 
  BaseOperation, 
  Descendant, 
  Editor } from "slate"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"
import { initialSlateValue } from "./data"
import { 
  withImages, 
  withInlines} from "./utils"


export const useSlate = () =>{
  const editorRef = useRef<Editor>()

  if ( !editorRef.current ) {
    editorRef.current = withImages(withInlines(withHistory(withReact(createEditor()))))
  }

  const editor = editorRef.current
  const dispatch = useAppDispatch()
  const [ isSlateInvalid, setIsSlateInvalid ] = useState(false)
  const writeup = useSelectWriteup()
  const id = useRef(`${ Date.now() }`)
  const remote = useRef(false)

  const initialValue = useMemo(() =>{
    if ( writeup.content[0].data.length ) {
      editor.children = writeup.content[0].data

      return writeup.content[0].data
    }

    return initialSlateValue
  }, [writeup.content])

  const handleSlateEmitter = () => {
    const socket = writeup.socket
    
    if ( socket && editor.operations.length && !remote.current ) {

      const operations = editor.operations
          .filter(operation => operation && operation.type !=="set_selection" &&
          operation.type !== "set_value" && !operation.data )
          .map((operation: any) => ({ ...operation, data: { source: "one" } }));
      
        socket.emit(Events.clients.emit_slate, {
        writeup: writeup.writeupId,
        editorId: id.current,
        slate: operations
      })
    }
  }

  useEffect(() =>{
    if ( writeup.socket ) {
      const socket = writeup.socket

      socket.on(Events.server.broadcast_slate, ( editorData: { slate: BaseOperation[], editorId: string } ) => {
        
        if ( editor && editorData.editorId!==id.current ) {
          remote.current = true
          editorData.slate.forEach(operation => {
            editor.apply(operation)
          })
          remote.current = false
        }
      })
    }
  }, [ writeup.socket ])

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
    initialValue,
    handleSlateEmitter
  }
}