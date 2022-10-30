import { RenderElementProps } from "slate-react";


const RenderElement = ({ attributes, children, element }: RenderElementProps) =>{

  switch(element.type) {
    case "heading-two":
      return (
        <h2 { ...attributes }>
          { children }
        </h2>
      )
    case "heading-three":
      return (
        <h3 { ...attributes }>
          { children }
        </h3>
      )
    case "heading-four":
      return (
        <h4 { ...attributes }>
          { children }
        </h4>
      )
    case "paragraph":
      return (
        <p { ...attributes }>
          { children }
        </p>
      )
  }
  
  return <></>
}


export default RenderElement