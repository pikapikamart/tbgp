import { 
  useEffect, 
  useRef } from "react"
import { trpc } from "@/lib/trpc";
import { BaseUserSchema } from "src/server/schemas/base.user.schema";
import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  setErrors,
  removeErrors,
  elementHasError
} from "../utils";


// --------General--------
interface AnyFocusableELement extends HTMLElement{}
type RegisterControl = ( element: AnyFocusableELement | null) => void
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

// --------{}--------

type UserInfo = BaseUserSchema & {
  [ key: string ]: string,
}

export const useSignupStaff = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const formInputs = useRef<HTMLInputElement[]>([]);
  const [ credentials, setCredentials ] = useState<UserInfo>({
    email: "",
    password: ""
  })
  const { data, refetch } = trpc.useQuery(["staff.validate", credentials],{
    refetchOnWindowFocus: false,
    enabled: false
  })

  const addInputsRef = ( element: HTMLInputElement | null ) => {
    if ( element && !formInputs.current.includes(element) ) {
      formInputs.current.push(element)
    }
  }

  const handleFormSubmit = () => {
    const userInfo = formInputs.current.reduce(( accu, cur ) => {
      accu[cur.name] = cur.value;

      return accu;
    },{} as UserInfo);

    setCredentials(userInfo)
  }

  useEffect(() =>{
    if ( credentials.email && credentials.password ) {
      refetch();
    }
  }, [ credentials ])

  useEffect(() =>{
    if ( data?.success ) {
      form.current?.submit();
    }
  }, [ data ])

  return {
    form,
    addInputsRef,
    handleFormSubmit,
    data
  }
}

type FormFields = HTMLInputElement | HTMLTextAreaElement
type UserInformation = BaseUserSchema & {
  [ key: string ]: string
}

export const useUserLogin = () => {
  const formInputsRef = useRef<FormFields[]>([])
  const ariaLiveRef = useRef<HTMLParagraphElement | null>(null)
  const [ userData, setUserData ] = useState<UserInformation>({
    email: "",
    password: ""
  })

  const addFieldRef = ( element: FormFields | null ) => {
    if ( element && !formInputsRef.current?.includes(element) ) {
      formInputsRef.current.push(element)
    }
  }

  const configureLiveRegionErrors = ( isError: boolean ) => {
    if ( !ariaLiveRef.current ) {
      return 
    }

    if ( isError ) {
      const errorInputs = formInputsRef.current.filter(input => input.getAttribute("aria-invalid")==="true")
      const errorInputsName = errorInputs.reduce((accu, cur) => {
        accu.push(cur.name)

        return accu
      }, [] as string[])

      ariaLiveRef.current.textContent = "Error submission. Please check your " + errorInputsName.join(", ") + " input fields."
    } else {
      ariaLiveRef.current.textContent = ""
    }
  }
 
  const handleFormSubmit = () => {
    let errorOccured = false
    let userDataCopy: UserInformation = { ...userData }

    formInputsRef.current.forEach(input => {
      
      if ( elementHasError(input) ) {
        setErrors(input)
        errorOccured = true
      } else {
        removeErrors(input)
        errorOccured = false
        userDataCopy[input.name] = input.value
      }
    })

    if ( errorOccured ) {
      configureLiveRegionErrors(true)

      return
    }

    configureLiveRegionErrors(false)
    setUserData(() => ({ ...userDataCopy }))
  }

  const handleSignIn = ( userType: string, callbackUrl: string ) => {
    signIn("credentials", {
      ...userData,
      userType,
      callbackUrl
    })
  }
 
  return {
    addFieldRef,
    ariaLiveRef,
    handleFormSubmit,
    handleSignIn,
    userData
  }
}

export const useAdminLogin = () => {
  const {
    addFieldRef,
    ariaLiveRef,
    handleFormSubmit,
    handleSignIn,
    userData
  } = useUserLogin();
  const { data, refetch } = trpc.useQuery(["admin.validate", userData], {
    refetchOnWindowFocus: false,
    enabled: false
  })

  useEffect(() =>{
    if ( userData.email && userData.password ) {
      refetch()
    }
  }, [ userData ])

  useEffect(() => {
    if ( data?.success ) {
      handleSignIn("admin", "/admin")
    }
  }, [ data ])

  return {
    addFieldRef,
    ariaLiveRef,
    handleFormSubmit,
    data
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
  const { isExpanded, handleExpansion } = useExpansion()
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

export const useTablistSelection = () => {
  const [ currentTabindex, setCurrentTabindex ] = useState(0)
  const tabsRefs = useRef<HTMLButtonElement[]>([])
  const currentFocusIndexRef = useRef(0)
  const tablistContentRef = useRef<HTMLDivElement | null>(null)

  const addTabRef = ( element: HTMLButtonElement | null ) => {
    if ( element && !tabsRefs.current.includes(element) ) {
      tabsRefs.current.push(element)
    }
  }

  const handleChangeTabFocus = ( event: React.KeyboardEvent<HTMLDivElement> ) => {
    const { key } = event
    const tabsLength = tabsRefs.current.length

    switch(key) {
      case "ArrowRight":
        currentFocusIndexRef.current = ++currentFocusIndexRef.current===tabsLength? 0: currentFocusIndexRef.current
        tabsRefs.current[currentFocusIndexRef.current].focus()  

        return
      case "ArrowLeft":
        currentFocusIndexRef.current = --currentFocusIndexRef.current===-1? tabsLength-1: currentFocusIndexRef.current
        tabsRefs.current[currentFocusIndexRef.current].focus()  

        return
      case "ArrowUp":
      case "ArrowDown":
    }
  }

  const handleChangeCurrentTabindex = ( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    const { dataset } = event.currentTarget
    
    if ( dataset.index && parseInt(dataset.index)!==currentTabindex ) {
      setCurrentTabindex(parseInt(dataset.index))
    }
  }

  return {
    currentTabindex,
    addTabRef,
    handleChangeTabFocus,
    handleChangeCurrentTabindex
  }
}