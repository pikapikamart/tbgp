import { RenderLeafProps } from "slate-react";


const RenderLeaf = ({ attributes, children, leaf }: RenderLeafProps) =>{

  if ( leaf.bold ) {
    children = <strong>{ children }</strong>
  }

  if ( leaf.italic ) {
    children = <i>{ children }</i>
  }

  return (
    <span { ...attributes } >
      { children }
    </span>
  )
}


export default RenderLeaf