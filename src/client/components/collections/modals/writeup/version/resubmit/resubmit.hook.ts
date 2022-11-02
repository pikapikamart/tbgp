import { useExpansion } from "@/lib/hooks"
import { 
  useAppDispatch, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { WriteupNote } from "@/src/server/models/writeup.model"
import { useModalContext } from "@/store/context/modal/modal"
import { resubmitTask } from "@/store/slices/staff.slice"
import { resubmitWriteup } from "@/store/slices/writeup.slice"
import { 
  useCallback, 
  useState,
  useEffect } from "react"


export const useResubmit = () => {
  const { isExpanded, handleExpansion } = useExpansion()
  const [ isError, setIsError ] = useState(false)
  const modalContext = useModalContext()
  const writeup = useSelectWriteup()
  const dispatch = useAppDispatch()
  const [ notes, setNotes ] = useState<WriteupNote[]>([
    {
      title: "",
      message: ""
    }
  ])
  const mutation = trpc.useMutation(["writeup.re-submit"], {
    onSuccess: () =>{
      modalContext.removeModal()
      dispatch(resubmitTask(writeup.writeupId))
      dispatch(resubmitWriteup())
    }
  })

  const handleAddExtraNote = useCallback(() =>{
    setNotes(prev => {
      const newNotes = Array.from(prev).concat([{
        title: "",
        message: "" 
      }])

      return newNotes
    })
  }, [])

  const handleResubmit = () =>{
    let hasError = false
    notes.forEach(note => {
      if ( !note.message || !note.title ) {
        hasError = true
        setIsError(true)
        return
      }
    })
    if ( hasError ) {
      return
    }

    mutation.mutate({
      writeupId: writeup.writeupId,
      notes
    })
  }

  useEffect(() =>{
    if ( isError ) {
      const timeout = setTimeout(() => {
        setIsError(false)
      }, 4000)

      return () => clearTimeout(timeout)
    }

  }, [ isError ])

  return {
    isExpanded,
    handleExpansion,
    notes,
    setNotes,
    handleAddExtraNote,
    handleResubmit,
    isError
  }
}