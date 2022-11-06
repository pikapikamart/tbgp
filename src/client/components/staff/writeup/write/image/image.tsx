import { ColoredMediumButton } from "@/styled/collections/button"
import { FormBottomControls } from "@/styled/shared/form"
import { SrOnly } from "@/styled/shared/helpers"
import { useCallback } from "react"
import { useImageAddition } from "./image.hook"
import { 
  ImageContainer, 
  ImageLabel, 
  ImageModalWrapper,
  Image as StyledImage, 
  ImageSizeContainer,
  ImageSizeLegend,
  ImageRadioList,
  ImageRadioItem,
  CaptionHeading,
  CaptionInput,
  CaptionLabel} from "./image.styled"


export type ImageSize = "small" | "medium" | "large"

type ImageProps = {
  extractData: ( image: string, caption: string ) => void,
  exit: () => void
}

const sizes: readonly ImageSize[] = ["small", "medium", "large"]

const Image = ({ extractData, exit }: ImageProps) => {
  const {
    image,
    imageSize,
    registerControl,
    registerTrapContainer,
    handleInputOnChange,
    handleSizeChange,
    handleAddCaption
  } = useImageAddition()

  const renderRadioItems = useCallback(() =>{
    const radios = sizes.map(size => (
      <ImageRadioItem key={ size }>
        <CaptionLabel
          htmlFor={ size }>{ size[0].toUpperCase() + size.slice(1) }
        </CaptionLabel>
        <input
          type="radio"
          id={ size }
          name="sizes"
          defaultChecked={ size==="large" }
          onChange={ () => handleSizeChange(size) } />
      </ImageRadioItem>
    ))
  
    return radios
  }, [])

  return (
    <ImageModalWrapper onKeyDown={ registerTrapContainer }>
      <ImageContainer>
        <SrOnly
          as="input"
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={ handleInputOnChange }
          ref={ registerControl } />
        <ImageLabel 
          isDone={ image.url!=="" }
          htmlFor="image">
          <SrOnly>Add image</SrOnly>
        </ImageLabel>
        { image.url!=="" && (
          <StyledImage 
            src={ image.url }
            alt={ image.caption }
            imageSize={ imageSize } />
        ) }
      </ImageContainer>
      <ImageSizeContainer>
        <ImageSizeLegend>Image size</ImageSizeLegend>
        <ImageRadioList>
          { renderRadioItems() }
        </ImageRadioList>
      </ImageSizeContainer>
      <div>
        <CaptionHeading>
          Add image caption
          <span>(optional)</span>
        </CaptionHeading>
        <CaptionInput
          type="text"
          onBlur={ handleAddCaption } />
      </div>
      <FormBottomControls>
        <ColoredMediumButton
          colored="blue"
          onClick={ () => extractData(image.url, image.caption) }>Add image
        </ColoredMediumButton>
        <ColoredMediumButton
          colored="borderGray"
          ref={ registerControl }
          onClick={ exit }>Close
        </ColoredMediumButton>
      </FormBottomControls>
    </ImageModalWrapper>
  )
}


export default Image