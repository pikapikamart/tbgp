import { SrOnly } from "@/styled/shared/helpers"
import { InputProps } from "../regular/input"
import { 
  InputBlock, 
  InputError } from "../regular/input.styled"
import { SigninInputWrapper } from "./input.styled"


const Input = ({
  name,
  addFieldRef,
  type
}: Pick<InputProps, "name" | "addFieldRef" | "type">) =>{

  return (
    <InputBlock>
      <SrOnly
        as="label"
        htmlFor={ name }>Enter email
      </SrOnly>
      <SigninInputWrapper
        name={ name }
        id={ name }
        type={ type }
        ref={ addFieldRef }
        placeholder={ name }
        aria-required="true" />
      <InputError>Please enter a valid { name } value
      </InputError> 
    </InputBlock>
  )
}


export default Input