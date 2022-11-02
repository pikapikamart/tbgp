import styled, { css } from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"
import { InputError } from "@/components/collections/inputs/regular/input.styled"


export const ImageModalWrapper = styled.div`
  background-color: ${ ({ theme }) => theme.colors.white1 };
  border-radius: ${ rem(4) };
  max-width: ${ rem(960) };
  position: relative;
  padding: ${ fluid(48, 8, 64) } ${ rem(32) } ${ fluid(40, 7, 56) };
  width: 100vw;
  z-index: 50;
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

export const Image = styled.img`
  margin: 0 auto;
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
    font-size: ${ rem(13) };
    margin-left: ${ rem(4) };
  }
`

export const CaptionInput = styled.input`
  border-radius: ${ rem(4) };
  font-size: ${ rem(15) };
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