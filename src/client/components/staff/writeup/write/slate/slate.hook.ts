import { 
  useAppDispatch, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { Events } from "@/pages/storybuilder/writeup/[writeup]/phase.hook"
import { resetSubmission, setWriteupSlate } from "@/store/slices/writeup.slice"
import { 
  useMemo,
  useEffect,
  useState, 
  useRef} from "react"
import { 
  BaseOperation, 
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
  const receivingEnd = useRef(false)

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
        .filter(operation => 
          operation && 
          operation.type !=="set_selection")
        .map((operation: any) => ({ ...operation, data: { source: "one" } }))

      if ( !operations.length ) {
        return
      }

      if ( !receivingEnd.current ) {
        socket.emit(Events.clients.emit_slate, {
          writeup: writeup.writeupId,
          editorId: id.current,
          slate: operations
        })
      }
      receivingEnd.current = false
    }
  }

  useEffect(() =>{
    if ( writeup.socket ) {
      const socket = writeup.socket

      socket.on(Events.server.broadcast_slate, ( editorData: { slate: BaseOperation[], editorId: string } ) => {

        if ( editor && editorData.editorId!==id.current ) {
          remote.current = true
          try {
            Editor.withoutNormalizing(editor, () => {
              (JSON.parse(JSON.stringify(editorData.slate)) as BaseOperation[]).forEach(operation => {
                editor.apply(operation)
              })
            })

          } catch(error) {

          }

          remote.current = false
          receivingEnd.current = true
        }
      })
    }
  }, [ writeup.socket ])

  useEffect(() =>{
    if ( writeup.shouldSave ) {
      if ( editor.children.length===1 && editor.children[0].children[0].text==="" ) {
        setIsSlateInvalid(true)
        dispatch(resetSubmission())
      } else {
        dispatch(setWriteupSlate(editor.children))
      }
    }
  }, [ writeup.shouldSave ])

  useEffect(() =>{
    if ( isSlateInvalid ) {
      const timeout = setTimeout(() => {
        setIsSlateInvalid(false)
      }, 4000)

      return () => clearTimeout(timeout)
    }
  }, [ isSlateInvalid ])

  return {
    editor,
    writeup,
    isSlateInvalid,
    initialValue,
    handleSlateEmitter
  }
}