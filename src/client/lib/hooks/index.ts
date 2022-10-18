import { 
  useEffect, 
  useRef } from "react"
import { trpc } from "@/lib/trpc";
import { BaseUserSchema } from "src/server/schemas/base.user.schema";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  removeErrors,
  inputHasError,
  addErrors} from "../utils";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "./store.hooks";
import { selectStaff, setStaff } from "@/store/slices/staff.slice";
import { useHeader } from "@/components/layout/header/header.hook";


// --------General--------
interface AnyFocusableELement extends HTMLElement {}
export type RegisterControl = ( element: AnyFocusableELement | null) => void
type RegisterTrapContainer = ( event: React.KeyboardEvent ) => void

export const useTrapFocus = (): [ RegisterControl, RegisterTrapContainer ] =>{
  const firstControl = useRef<AnyFocusableELement | null>(null)
  const lastControl = useRef<AnyFocusableELement | null>(null)

  const registerControl: RegisterControl = ( element ) =>{
    if ( !firstControl.current ) {
      firstControl.current = element
    } else {
      lastControl.current = element
    }
  }

  const registerTrapContainer: RegisterTrapContainer = ( event ) => {

    if ( !firstControl.current || !lastControl.current ) {
      return
    }    

    const currentElement = document.activeElement

    if ( currentElement===firstControl.current && event.shiftKey && event.key==="Tab" ) {
      event.preventDefault()
      lastControl.current.focus()
    } else if ( currentElement===lastControl.current && !event.shiftKey && event.key==="Tab" ) {
      event.preventDefault()
      firstControl.current.focus()
    }
  }

  return [
    registerControl,
    registerTrapContainer
  ]
}

export type FormFields = HTMLInputElement | HTMLTextAreaElement
export type AddFieldRef = ( element: FormFields | null ) => void
type HandleFormSubmit = ( event: React.FormEvent ) => void 

export const useFormValidation = () => {
  const [ isValidData, setIsValidData ] = useState(false)
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const formFieldsRefs = useRef<FormFields[]>([])
  const ariaLive = useRef<HTMLParagraphElement | null>(null)

  // Add an element as a referenced element
  const addFieldRef: AddFieldRef = ( element ) => {
    if ( element && !formFieldsRefs.current.includes(element) ) {
      formFieldsRefs.current.push(element)
    }
  }

  // Returns an array of referenced form fields
  const getFieldsRef = () => {
    return formFieldsRefs.current
  }

  const configureLiveRegion = ( hasError: boolean ) => {
    if ( !ariaLive.current ){
      return
    }

    if ( hasError ) {
      const invalidFields = getFieldsRef().filter(field => field.getAttribute("aria-invalid")==="true")
      const invalidFieldsNames = invalidFields.map(field => field.name)

      ariaLive.current.textContent = "Form submission invalid. Please check your " + invalidFieldsNames.join(" , ") + " input fields"
    
      return
    } 
    ariaLive.current.textContent = ""
  }

  const handleFormSubmit: HandleFormSubmit = ( event ) => {
    event.preventDefault()
    let formHasError = false
    setIsSubmitting(true)

    formFieldsRefs.current.forEach(field => {
      if ( inputHasError(field) ) {
        formHasError = true
        addErrors(field)
      } else {
        removeErrors(field)
        formHasError = false
      }
    })

    if ( formHasError ) {
      configureLiveRegion(true)
      resetFormValidation()
    } else {
      setIsValidData(true)
    }
  }

  const resetFormValidation = () => {
    setIsSubmitting(false)
    setIsValidData(false)
  }

  return {
    isValidData,
    isSubmitting,
    ariaLive,
    addFieldRef,
    getFieldsRef,
    handleFormSubmit,
    resetFormValidation
  }
}

type UserInformation = BaseUserSchema & {
  [ key: string ]: string
}

export const useUserLogin = ( 
  userType: string, 
  callbackUrl: string, 
  path: "admin.validate" | "staff.validate" 
) => {
  const {
    addFieldRef,
    ariaLive,
    isValidData,
    getFieldsRef,
    handleFormSubmit,
    resetFormValidation
  } = useFormValidation()
  const [ userData, setUserData ] = useState<UserInformation>({
    email: "",
    password: ""
  })
  const query = trpc.useQuery([path, userData], {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: () =>{
      signIn("credentials", {
        ...userData,
        userType,
        callbackUrl
      })
    },
    onError: () => {
      resetFormValidation()
    }
  })

  useEffect(() =>{
    if ( isValidData ) {
      const user = getFieldsRef().reduce((accu, cur) =>{
        accu[cur.name] = cur.value

        return accu
      }, {} as UserInformation)

      setUserData(user)
    }
  }, [ isValidData ])

  useEffect(() =>{
    if ( userData.email && userData.password ) {
      query.refetch()
    }
  }, [ userData ])

  return {
    addFieldRef,
    ariaLive,
    handleFormSubmit,
    data: query.data
  }
}

export const useExpansion = () =>{
  const [ isExpanded, setIsExpanded ] = useState(false)

  const handleExpansion = () => {
    setIsExpanded(prev => !prev)
  }

  return {
    isExpanded,
    handleExpansion
  }
}

export const useProfileExpansion = () => {
  const { isExpanded, handleExpansion } = useHeader()
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() =>{
    if ( !wrapperRef.current ) {
      return
    }

    isExpanded? wrapperRef.current.classList.add("toggled") : wrapperRef.current.classList.remove("toggled");

  }, [ isExpanded ])

  return {
    isExpanded,
    handleExpansion,
    wrapperRef
  }
}