import { SrOnly } from "@/styled/shared/helpers"
import { 
  BastionIdButtonCopied, 
  BastionIdListButton } from "../bastionids.styled"
import { useCopyBastionId } from "./button.hook"


type ButtonProps = {
  id: string
}

const Button = ({ id }: ButtonProps) =>{
  const {
    showCopied,
    inputRef,
    handleCopy
  } = useCopyBastionId()

  return (
    <>
      { showCopied && <BastionIdButtonCopied>Copied!</BastionIdButtonCopied> }
      <SrOnly
        as="input"
        type="text"
        tabIndex={ -1 }
        aria-hidden="true"
        ref={ inputRef }
        defaultValue={ id } />
      <BastionIdListButton onClick={ handleCopy }>{ id }</BastionIdListButton>
    </>
  )
}


export default Button