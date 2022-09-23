import { 
  useEffect, 
  useRef } from "react"
import { trpc } from "@/lib/trpc";
import { BaseUserSchema } from "src/server/schemas/base.user.schema";


type UserInfo = BaseUserSchema & {
  [ key: string ]: string,
}

export const useSignupStaff = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const formInputs = useRef<HTMLInputElement[]>([]);
  const mutation = trpc.useMutation("staff.validate");

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

    mutation.mutate(userInfo);
  }

  useEffect(() => {
    if ( mutation.data?.success ) {
      form.current?.submit();
    }
  }, [ mutation.data ])

  return {
    form,
    addInputsRef,
    handleFormSubmit,
    mutation
  }
}