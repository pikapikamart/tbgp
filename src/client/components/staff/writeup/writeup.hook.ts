import { 
  useAppDispatch, 
  useSelectWriteup } from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { 
  resetSubmission, 
  setInvalidSlate, 
  setWriteupSlate } from "@/store/slices/writeup.slice"
import { useEffect } from "react"


export const useSaveWriteup = () =>{
  const dispatch = useAppDispatch()
  const writeup = useSelectWriteup()
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

  useEffect(() =>{
    if ( writeup.currentPhase==="writeup" ) {
      const content = writeup.content[0]
      saveWriteupPhaseMutation.mutate({
        title: content.title,
        caption: content.caption,
        writeupId: writeup.writeupId,
        content: content.data
      })
    }
  }, [ writeup.isSlateValid, writeup.isHeadingValid ])

  return {
    isSuccess: saveWriteupPhaseMutation.isSuccess || saveWriteupMutation.isSuccess
  }
}