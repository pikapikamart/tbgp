import { SrOnly } from "@/styled/shared/helpers"
import React, { useCallback } from "react"
import { useSlate } from "slate-react"
import { 
  isMarkActive, 
  toggleMark } from "../../utils"
import { 
  MarkButton, 
  ToolbarItem } from "../toolbar.styled"


type ButtonProps = {
  text: string,
  label: string,
  format: string,
  decoration?: "underline" | "italic" | "bold",
}

const Button = ({ 
  text,
  label, 
  format,
  decoration,
}: ButtonProps) =>{
  const editor = useSlate()

  const handleMarking = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    event.preventDefault()
    toggleMark(editor, format)
  },[])

  return (
    <ToolbarItem>
      <MarkButton
        isActive={ isMarkActive(editor, format) }
        decoration={ decoration }
        onMouseDown={ handleMarking }>
        { text }
        <SrOnly>{ label }</SrOnly>
      </MarkButton>
    </ToolbarItem>
  )
}


export default Button