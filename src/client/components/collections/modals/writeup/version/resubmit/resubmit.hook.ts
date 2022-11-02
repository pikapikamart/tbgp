import { useExpansion } from "@/lib/hooks"
import { WriteupNote } from "@/src/server/models/writeup.model"
import { 
  useCallback, 
  useState,
  useEffect } from "react"


export const useResubmit = () => {
  const { isExpanded, handleExpansion } = useExpansion()
  const [ isError, setIsError ] = useState(false)
  const [ notes, setNotes ] = useState<WriteupNote[]>([
    {
      title: "",
      message: ""
    }
  ])

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
    if ( !hasError ) {
      return
    }
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