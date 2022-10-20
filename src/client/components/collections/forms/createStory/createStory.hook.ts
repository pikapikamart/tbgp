import { 
  useExpansion, 
  useFormValidation, 
  useTrapFocus} from "@/lib/hooks"
import { 
  useState,
  useEffect } from "react"
import { 
  ActionMeta, 
  MultiValue, 
  OnChangeValue } from "react-select"
import { useRouter } from "next/router"
import { trpc } from "@/lib/trpc"
import { StoryRequestSchema } from "@/src/server/schemas/story.request.schema"
import { useModalContext } from "@/store/context/modal/modal"


export type SelectOption = {
  value: string,
  label: string
}

export type SetSelectedOptions = ( options: OnChangeValue<SelectOption, true>, actionMeta: ActionMeta<SelectOption> ) => void

type StoryRequestData = StoryRequestSchema & {
  [ key: string ]: string
}

export const useCreateStoryRequest = () =>{
  const router = useRouter()
  const modalContext = useModalContext()
  const { isExpanded, handleExpansion } = useExpansion()
  const {
    addFieldRef,
    getFieldsRef,
    handleFormSubmit,
    isValidData
  } = useFormValidation()
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const [ assignedMembers, setAssignedMembers ] = useState<MultiValue<SelectOption>>([])
  const mutation = trpc.useMutation("storyRequest.create", {
    onSuccess: () =>{
      router.replace("/storybuilder?tab=created")
      modalContext.removeModal()
    } 
  })

  const handleSetAssignedMembers: SetSelectedOptions = ( options: OnChangeValue<SelectOption, true>, actionMeta: ActionMeta<SelectOption> ) => {
    setAssignedMembers(options)
  }

  useEffect(() => {
    if ( isValidData ) {
      const storyRequest = getFieldsRef().reduce((accu, cur) =>{
        accu[cur.name] = cur.value

        return accu
      }, {} as StoryRequestData)

      storyRequest.assignedMembers = assignedMembers.length? assignedMembers.map(member => member.value) : undefined
    
      mutation.mutate(storyRequest)
    }
  }, [ isValidData ])

  return {
    modalContext,
    isExpanded,
    handleExpansion,
    addFieldRef,
    handleFormSubmit,
    registerControl,
    registerTrapContainer,
    assignedMembers,
    handleSetAssignedMembers
  }
}