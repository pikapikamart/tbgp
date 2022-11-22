import { 
  BastionIdButtonCopied, 
  BastionIdListButton } from "../bastionids.styled"
import { useCopyBastionId } from "./button.hook"
import { CopyToClipboard } from "react-copy-to-clipboard"


type ButtonProps = {
  id: string
}

const Button = ({ id }: ButtonProps) =>{
  const {
    showCopied,
    handleCopy
  } = useCopyBastionId()

  return (
    <>
      { showCopied && <BastionIdButtonCopied>Copied!</BastionIdButtonCopied> }
      <CopyToClipboard text={ id }>
        <BastionIdListButton onClick={ handleCopy }>{ id }</BastionIdListButton>
      </CopyToClipboard>
    </>
  )
}


export default Button