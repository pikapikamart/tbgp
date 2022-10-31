import { useExpansion } from "@/lib/hooks"
import { SrOnly } from "@/styled/shared/helpers"
import { useSlate } from "slate-react"
import { 
  insertLink, 
  isLinkActive } from "../../utils"
import { 
  MarkButton, 
  PasteLink, 
  ToolbarItem } from "../toolbar.styled"
import LinkIcon from "@/public/icons/icon-paste-link.svg"


const Link = () =>{
  const { isExpanded, handleExpansion } = useExpansion()
  const editor = useSlate()

  const handleAddLink = ( event: React.KeyboardEvent<HTMLInputElement> ) =>{
    
    if ( event.key==="Enter" && event.currentTarget.value ) {
      insertLink(editor, event.currentTarget.value as string)
      handleExpansion()
    }
  }

  return (
    <ToolbarItem>
      <MarkButton
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }
        isActive={ isLinkActive(editor) }>
        <LinkIcon />
        <SrOnly>add a link</SrOnly>
      </MarkButton>
      { isExpanded && (
        <PasteLink
          onKeyDown={ handleAddLink } />
      ) }
    </ToolbarItem>
  )
}


export default Link