import { 
  RenderElementProps, 
  useFocused, 
  useSelected } from "slate-react"
import { 
  ImageElementContainer,
  ImageElement } from "../../slate.styled"


const Image = ({ attributes, element, children }: RenderElementProps) =>{
  const selected = useSelected()
  const focused = useFocused()
  
  if ( element.type!=="image" ) {
    return <></>
  }

  return (
    <ImageElementContainer 
      { ...attributes }
      highlight={ selected && focused }>
      <div contentEditable={ false }>
        <ImageElement
          src={ element.url }
          alt={ element.caption } />
      </div>
      { children }
    </ImageElementContainer>
  )
}


export default Image