import { 
  AddFieldRef, 
  RegisterControl } from "@/lib/hooks"
import { addErrors } from "@/lib/utils"
import { 
  useEffect, 
  useRef } from "react"
import { 
  InputBlock,
  InputLabel,
  InputError,
  InputWrapper } from "./input.styled"


export type InputProps = {
  name: string,
  labelText: string,
  addFieldRef: AddFieldRef,
  defValue?: string,
  registerControl?: RegisterControl,
  type?: string,
  error?: string
}

const Input = ({ 
  name, 
  labelText,
  addFieldRef, 
  defValue,
  type,
  registerControl,
  error
}: InputProps) =>{
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() =>{
    if ( error && inputRef?.current ) {
      addErrors(inputRef.current)
    }
  })

  return (
    <InputBlock>
      <InputLabel htmlFor={ name }>
        { labelText }
        <span>*</span>
      </InputLabel>
      <InputWrapper
        type={ type?? "text" }
        id={ name }
        name={ name }
        defaultValue={ defValue?? "" }
        ref={ el => {
          addFieldRef(el)
          inputRef.current = el
          registerControl? registerControl(el) : null
        } }
        aria-required="true" />
      <InputError id={ "error-" + name }>{ error?? `Please enter a valid ${ name } value` }</InputError>
    </InputBlock>
  )
}


export default Input