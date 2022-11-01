import { 
  useAppDispatch, 
  useSelectStaff, 
  useSelectWriteup} from "@/lib/hooks/store.hooks"
import { trpc } from "@/lib/trpc"
import { 
  resetSubmission, 
  setShouldSave } from "@/store/slices/writeup.slice"
import { useEffect } from "react"


export const useSaveWriteup = () =>{
  const staff = useSelectStaff()
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

  useEffect(() =>{
    if ( writeup.isSlateValid && writeup.isHeadingValid ) {
      if ( writeup.currentPhase==="writeup" ) {
        const content = writeup.content[0]
        saveWriteupPhaseMutation.mutate({
          title: content.title,
          caption: content.caption,
          writeupId: writeup.writeupId,
          content: content.data
        })
      }
    }
  }, [ writeup.isSlateValid, writeup.isHeadingValid ])

  return {
    staff,
    writeup,
    handleWriteupSave,
  }
}