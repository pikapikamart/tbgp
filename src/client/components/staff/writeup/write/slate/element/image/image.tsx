import { 
  RenderElementProps, 
  useFocused, 
  useSelected } from "slate-react"
import { CoverCaption } from "../../../header/cover/cover.styled"
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
          { element.caption!=="" && <CoverCaption>{ element.caption }</CoverCaption> }
      </div>
      { children }
    </ImageElementContainer>
  )
}


export default Image