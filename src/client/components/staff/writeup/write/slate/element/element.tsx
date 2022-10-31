import { RenderElementProps } from "slate-react";
import { 
  HeadingFour, 
  HeadingThree, 
  HeadingTwo, 
  Paragraph } from "../slate.styled";
import { LinkElement } from "./link";


const RenderElement = ({ attributes, children, element }: RenderElementProps) =>{

  switch(element.type) {
    case "heading-two":
      return (
        <HeadingTwo { ...attributes }>
          { children }
        </HeadingTwo>
      )
    case "heading-three":
      return (
        <HeadingThree { ...attributes }>
          { children }
        </HeadingThree>
      )
    case "heading-four":
      return (
        <HeadingFour { ...attributes }>
          { children }
        </HeadingFour>
      )
    case "paragraph":
      return (
        <Paragraph { ...attributes }>
          { children }
        </Paragraph>
      )
    case "link":
      return (
        <LinkElement
          attributes={ attributes }
          children={ children }
          element={ element } />
      )
  }
  
  return <></>
}


export default RenderElement