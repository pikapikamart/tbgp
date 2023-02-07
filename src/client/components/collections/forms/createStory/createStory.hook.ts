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
import { useAppDispatch } from "@/lib/hooks/store.hooks"
import { addCreatedStoryRequest } from "@/store/slices/staff.slice"
import dayjs, { Dayjs } from 'dayjs';


export type SelectOption = {
  value: string,
  label: string
}

export type SetSelectedOptions = ( options: OnChangeValue<SelectOption, true>, actionMeta: ActionMeta<SelectOption> ) => void

type StoryRequestData = StoryRequestSchema & {
  [ key: string ]: string
}

type Deadline = {
  date: null | string,
  error: boolean
}

export const useCreateStoryRequest = () =>{
  const router = useRouter()
  const modalContext = useModalContext()
  const { isExpanded, handleExpansion } = useExpansion()
  const {
    addFieldRef,
    getFieldsRef,
    handleFormSubmit,
    isValidData,
    resetFormValidation
  } = useFormValidation()
  const [ registerControl, registerTrapContainer ] = useTrapFocus()
  const [ deadline, setDeadline ] = useState<Deadline>({
    date: `${ dayjs() }`,
    error: false
  })
  const [ assignedMembers, setAssignedMembers ] = useState<MultiValue<SelectOption>>([])
  const [ errorMessage, setErrorMessage ] = useState({
    message: "",
    code: ""
  })
  const dispatch = useAppDispatch()
  const mutation = trpc.useMutation("storyRequest.create", {
    onSuccess: ({ data }) =>{
      router.replace("/storybuilder?tab=created")
      dispatch(addCreatedStoryRequest(JSON.parse(JSON.stringify(data))))
      modalContext.removeModal()
    },
    onError: ( error ) => {
      setErrorMessage({
        message: error.message,
        code: error.data?.code?? ""
      })
      resetFormValidation()
    } 
  })

  const handleSetAssignedMembers: SetSelectedOptions = ( options: OnChangeValue<SelectOption, true>, actionMeta: ActionMeta<SelectOption> ) => {
    setAssignedMembers(options)
  }

  const handleSetDeadline = ( date: Dayjs | null ) => {
    if ( !date ) {
      return
    }

    setDeadline(() => ({
      error: dayjs().isSame(date, "d")? false : dayjs().isAfter(date),
      date: `${ date.toDate() }`
    }))
  }
  
  useEffect(() => {
    if ( isValidData && deadline.date ) {
      const storyRequest = getFieldsRef().reduce((accu, cur) =>{
        if ( cur.name==="headline" ) {
          accu["title"] = cur.value.trim()
        } else {
          accu[cur.name] = cur.value.trim()
        }

        return accu
      }, {} as StoryRequestData)

      storyRequest.assignedMembers = assignedMembers.length? assignedMembers.map(member => member.value) : undefined
      storyRequest.deadline = `${ deadline.date }`
      mutation.mutate(storyRequest)
      resetFormValidation()
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
    handleSetAssignedMembers,
    isError: mutation.isError,
    errorMessage,
    deadline,
    handleSetDeadline,
  }
}