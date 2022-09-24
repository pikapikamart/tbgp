import { 
  useEffect, 
  useRef } from "react"
import { trpc } from "@/lib/trpc";
import { BaseUserSchema } from "src/server/schemas/base.user.schema";
import { useState } from "react";
import { signIn } from "next-auth/react";


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

const setErrors = ( element: FormFields ) => {
  element.setAttribute("aria-invalid", "true");
  element.setAttribute("aria-describedby", `error-${ element.name }`)
  element.nextElementSibling?.classList.add("show")
}

const removeErrors = ( element: FormFields ) => {
  element.removeAttribute("aria-invalid")
  element.removeAttribute("aria-describedby")
  element.nextElementSibling?.classList.remove("show")
}

const elementHasError = ( element: FormFields ) => {
  if ( element.name!=="email" && element.value ) {
    return false
  }

  let re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/

  if ( element.name==="email" && re.test(element.value) ) {
    return false
  } 

  return true
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
      handleSignIn("admin", "/")
    }
  }, [ data ])

  return {
    addFieldRef,
    ariaLiveRef,
    handleFormSubmit,
    data
  }
}