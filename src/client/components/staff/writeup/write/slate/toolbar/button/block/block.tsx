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
  extraChild?: React.ReactElement
}

const Block = ({
  text,
  label, 
  format,
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
        onMouseDown={ handleMarking }>
        { text }
        { extraChild && <>{ extraChild }</> }
        <SrOnly>{ label }</SrOnly>
      </MarkButton>
    </ToolbarItem>
  )
}


export default Block