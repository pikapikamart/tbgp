import styled, { css } from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"
import { ImageSize } from "./image"


export const ImageModalWrapper = styled.div`
  background-color: ${ ({ theme }) => theme.colors.white1 };
  border-radius: ${ rem(4) };
  max-width: 100%;
  position: relative;
  padding: ${ fluid(48, 8, 64) } ${ fluid(16, 3, 32) } ${ fluid(40, 7, 56) };
  width: 100vw;
  z-index: 50;

  ${ breakpoint("desktop", `
    max-width: ${ rem(960) };
  `) }
`

type ImageLabelProps = {
  isDone?: boolean
}

export const ImageLabel = styled.label<ImageLabelProps>`
  border-radius: 50%;
  border: 1px solid ${ ({theme}) => theme.colors.grey3 };
  background: url("/icons/icon-add-image-2.svg") no-repeat center center;
  display: block;
  height: ${ rem(80) };
  width: ${ rem(80) };
  position: ${ ({isDone}) => isDone? "absolute" : "static" };

  ${ ({isDone}) => {
    switch(isDone) {
      case true: return css`
        background: none;
        border-radius: revert;
        border: none;
        height: 100%;
        width: 100%;
        position: absolute;
      `
      case false: return css`
        color: red;
      `
    }
  } }

  ${ breakpoint("desktop", `
    
    &:hover {
      cursor: pointer;
    }
  `) }
`

export const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: max-content;
  position: relative;

  input:focus-visible + ${ ImageLabel } {
    outline: 2px dashed rgb(0, 36, 58);
    outline-offset: 1px;
  }
`

type ImageProps = {
  imageSize: ImageSize
}

export const Image = styled.img<ImageProps>`
  margin: 0 auto;

  ${ ({ imageSize }) => {
    switch(imageSize) {
      case "small":
        return css`
          max-width: ${ fluid(260, 66, 704) };
        `
      case "medium":
        return css`
          max-width: ${ fluid(280, 68, 800) };
        `
      case "large":
        return css`
          max-width: ${ fluid(300, 70, 896) };
          `
    }
  } }
`

export const ImageSizeContainer = styled.fieldset`
  border: none;
  margin: ${ rem(16) } 0;
`

export const ImageSizeLegend = styled.legend`
  font-size: ${ rem(17) };
  font-weight: 600;
`

export const ImageRadioList = styled.ul`
  display: flex;
  margin-top: ${ rem(8) };
`

export const ImageRadioItem = styled.li`
  font-size: ${ rem(15) };

  &:not(:last-of-type) {
    margin-right: ${ fluid(4, 1, 8) };
  }
`

export const CaptionHeading = styled(ImageSizeLegend)`
  margin-bottom: ${ rem(8) };

  > span {
    color: red;
    font-size: ${ rem(13) };
    margin-left: ${ rem(4) };
  }
`

export const CaptionLabel = styled.label`
  ${ breakpoint("desktop", `

    &:hover {
      cursor: pointer;
    }
  `) }
`

export const CaptionInput = styled.input`
  border-radius: ${ rem(4) };
  font-size: ${ fluid(14, 1.3, 15) };
  padding: ${ rem(8) } ${ rem(4) };
  width: 100%;

  ${ ({ theme: { colors } }) => `
    border: 1px solid ${ colors.grey4 };
    color: ${ colors.dark2 };
  ` }

  &:focus-visible {
    outline: none;
  }
`