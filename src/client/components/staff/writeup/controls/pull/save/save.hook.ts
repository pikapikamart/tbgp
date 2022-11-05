import { 
  useAppDispatch, 
  useSelectWriteup} from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { 
  resetSubmission, 
  setShouldSave } from "@/store/slices/writeup.slice"
import { useEffect } from "react"


export const useSaveWriteup = () =>{
  const writeup = useSelectWriteup()
  const dispatch = useAppDispatch()
  const saveWriteupPhaseMutation = trpc.useMutation(["writeup.save-writeupPhase"], {
    onSuccess: () =>{
      dispatch(resetSubmission())
    }
  })
  const saveWriteupMutation = trpc.useMutation(["writeup.save"], {
    onSuccess: () =>{
      dispatch(resetSubmission())
    }
  })

  const handleWriteupSave = () => {
    dispatch(setShouldSave())
  }

  const saveMutate = () => {
    const content = writeup.content[0]
    const writeupBody = {
      title: content.title,
      caption: content.caption,
      writeupId: writeup.writeupId,
      content: content.data
    }

    if ( writeup.currentPhase==="writeup" ) {
      saveWriteupPhaseMutation.mutate(writeupBody)
    } else {
      saveWriteupMutation.mutate(Object.assign(writeupBody,
        writeup.currentPhase==="graphics"? { banner: writeup.banner }: undefined))
    }
  }

  useEffect(() =>{
    if ( writeup.isSlateValid && writeup.isHeadingValid ) {
      saveMutate()
    }
  }, [ writeup.isSlateValid, writeup.isHeadingValid ])

  useEffect(() =>{

    const handleKeydown = ( event: KeyboardEvent ) =>{
      if ( event.ctrlKey && event.key==="s" ) {
        event.preventDefault()
        saveMutate()
      }
    }

    document.body.addEventListener("keydown", handleKeydown)

    return () => document.body.removeEventListener("keydown", handleKeydown)
  },[])

  return {
    handleWriteupSave,
    isSuccess: saveWriteupPhaseMutation.isSuccess || saveWriteupMutation.isSuccess
  }
}