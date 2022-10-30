import { SrOnly } from "@/styled/shared/helpers"
import { useSlate } from "slate-react"
import { 
  MarkButton, 
  ToolbarItem } from "../../toolbar.styled"


type BlockProps = {
  text: string,
  label: string,
  format: string,
  decoration?: "underline" | "italic" | "bold",
  icon?: string
}

const Block = ({
  text,
  label, 
  decoration,
  icon 
}: BlockProps) => {
  const editor = useSlate()

  return (
    <ToolbarItem>
      <MarkButton
        decoration={ decoration }>
        { icon?
          <img 
            alt="" 
            src={ icon }/> :
          <>{ text }</>
        }
        <SrOnly>{ label }</SrOnly>
      </MarkButton>
    </ToolbarItem>
  )
}


export default Block