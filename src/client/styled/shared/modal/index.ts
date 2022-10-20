import styled, { css } from "styled-components"
import { 
  rem,
  fluid, 
  maxBreakpoint} from "@/styled/functions"


type Size = "small" | "medium" | "large"

const BaseModalWrapper = styled.div`
  border-radius: ${ rem(8) };
  padding: ${ fluid(48, 8, 64) } ${ rem(32) } ${ fluid(40, 7, 56) };
  position: relative;
  text-align: center;
  width: 100vw;

  ${({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    color: ${ colors.dark2 };
  `}
`

type ModalWrapperProps = {
  size: Size,
  padding?: Size
}

export const ModalWrapper = styled(BaseModalWrapper)<ModalWrapperProps>`

  ${ ({ size }) =>{
    switch(size) {
      case "small": 
        return css`max-width: ${ fluid(330, 70, 528) };`

      case "medium": 
        return css`max-width: ${ fluid(330, 75, 560) };`

      case "large": 
        return css`max-width: ${ fluid(330, 80, 624) };`
    }
  } }

  ${ maxBreakpoint(450, `
    max-width: 100%;
  `) }

  ${ ({ padding }) =>{
    switch(padding) {
      case "medium": 
        return css`padding: ${ rem(48) } ${ fluid(16, 3, 32) } ${ fluid(40, 7, 56) }; `
      case "large": 
        return css`padding: ${ fluid(48, 8, 64) } ${ fluid(16, 3, 32) } ${ fluid(40, 7, 56) };`
    }
  } }
`

type ModalHeadingProps = {
  size: Size,
  align?: string
}

export const ModalHeading = styled.h2.attrs({
  id: "modal-heading"
})<ModalHeadingProps>`
  text-align: ${ ({ align }) => align? align : "center" };

  ${ ({ size }) => {
    switch(size) {
      case "small":
        return css`
          font-size: ${ fluid(20, 3, 24) };
          margin-bottom: ${ rem(24) };
        `
      case "medium": 
        return css`
          font-size: ${ fluid(20, 4, 30) };
          margin-bottom: ${ rem(32) };
        `
    }
  } }
`