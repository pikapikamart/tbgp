import { AddFieldRef } from "@/lib/hooks"
import { SrOnly } from "@/styled/shared/helpers"
import {
  SigninInputBlock,
  SigninInputError,
  SigninInputWrapper
} from "./input.styled"


type InputProps = {
  name: string,
  addFieldRef: AddFieldRef,
  type: string,
  error?: any
}
// error is from the fetch result
// children is for the error text

const Input = ({
  name,
  addFieldRef,
  type
}: InputProps) =>{

  return (
    <SigninInputBlock>
      <SrOnly
        as="label"
        htmlFor={ name }>Enter email</SrOnly>
      <SigninInputWrapper
        name={ name }
        id={ name }
        type={ type }
        ref={ addFieldRef }
        placeholder={ name }
        aria-required="true" />
      <SigninInputError>Please enter a valid { name } value</SigninInputError> 
    </SigninInputBlock>
  )
}


export default Input