import { 
  RenderElementProps, 
  useSelected } from "slate-react";
import { LinkElement } from "../../slate.styled";
import { isLinkElement } from "../../utils";


const Link = ({ attributes, children, element }: RenderElementProps) => {
  const selected = useSelected()

  return (
    <LinkElement
      { ...attributes }
      href={ isLinkElement(element)? element.url : "" }>
      { children }
    </LinkElement>
  )
}


export default Link