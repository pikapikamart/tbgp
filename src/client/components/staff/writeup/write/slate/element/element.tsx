import { RenderElementProps } from "slate-react";


const RenderElement = ({ attributes, children, element }: RenderElementProps) =>{

  switch(element.type) {
    case "paragraph":
      return (
        <p { ...attributes }>
          { children }
        </p>
      )
    case "heading":
      return (
        <h2 { ...attributes }>
          { children }
        </h2>
      )
    case "code":
      return (
        <pre { ...attributes  }>
          <code>{ children }</code>
        </pre>
      )
  }
}


export default RenderElement