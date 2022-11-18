import { 
  useAppDispatch, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { SocketEvents } from "@/components/staff/writeup/phase.hook"
import { 
  addMemberSubmission,
  removeMemberSubmission,
  resetSubmission, 
  setWriteupSlate } from "@/store/slices/writeup.slice"
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
import { StaffState } from "@/store/slices/staff.slice"


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
  }, [])

  const handleSlateEmitter = () => {
    const socket = writeup.socket

    if ( socket && editor.operations.length && !remote.current ) {
      const operations = editor.operations
        .filter(operation => operation && operation.type !=="set_selection")
        .map((operation: any) => ({ ...operation, data: { source: "one" } }))

      if ( !operations.length ) {
        return
      }

      if ( !receivingEnd.current ) {
        
        socket.emit(SocketEvents.clients.emit_slate, {
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

      socket.on(SocketEvents.server.broadcast_request_previous_slate, ( socketId: string ) =>{
        socket.emit(SocketEvents.clients.emit_previous_slate, {
          socketId,
          slate: editor.children
        })
      })

      socket.on(SocketEvents.server.broadcast_previous_slate, ( slate: Descendant[] ) =>{
        editor.children = slate
        editor.onChange()
      })

      socket.on(SocketEvents.server.broadcast_slate, ( editorData: { slate: BaseOperation[], editorId: string } ) => {

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

      socket.on(SocketEvents.server.broadcast_part_submission, ( staff: StaffState ) =>{
        dispatch(addMemberSubmission(staff))
      })

      socket.on(SocketEvents.server.broadcast_cancel_part_submission, ( bastionId: string ) =>{
        dispatch(removeMemberSubmission(bastionId))
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