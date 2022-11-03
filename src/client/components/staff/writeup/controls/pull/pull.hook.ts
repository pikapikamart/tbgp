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
  }, [ writeup.isSlateValid, writeup.isHeadingValid ])

  return {
    staff,
    writeup,
    handleWriteupSave,
  }
}