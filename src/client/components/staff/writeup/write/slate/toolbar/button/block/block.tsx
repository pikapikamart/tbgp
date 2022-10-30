import { SrOnly } from "@/styled/shared/helpers"
import { useCallback } from "react"
import { CustomElementType } from "slate"
import { useSlate } from "slate-react"
import { 
  isBlockActive, 
  toggleBlock } from "../../../utils"
import { 
  MarkButton, 
  ToolbarItem } from "../../toolbar.styled"


type BlockProps = {
  text: string,
  label: string ,
  format: CustomElementType,
  decoration?: "underline" | "italic" | "bold",
  icon?: string,
  extraChild?: React.ReactElement
}

const Block = ({
  text,
  label, 
  format,
  decoration,
  icon,
  extraChild
}: BlockProps) => {
  const editor = useSlate()

  const handleMarking = useCallback(( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) =>{
    event.preventDefault()
    toggleBlock(editor, format)
  }, [])

  return (
    <ToolbarItem>
      <MarkButton
        isActive={ isBlockActive(editor, format) }
        decoration={ decoration }
        onMouseDown={ handleMarking }>
        { icon?
          <img 
            alt="" 
            src={ icon }/> :
          <>{ text }</>
        }
        { extraChild && <>{ extraChild }</> }
        <SrOnly>{ label }</SrOnly>
      </MarkButton>
    </ToolbarItem>
  )
}


export default Block