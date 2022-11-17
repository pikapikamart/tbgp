import styled, { css } from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"


type ColoredButtonProps = {
  colored?: "darkBlue" | "green" | "blue" | "red" | "skyBlue" | "violet" | "orange" | "grey" | "borderGray"
}

const BaseButton = styled.button<ColoredButtonProps>`
  border-radius: ${ rem(4) };
  color: ${({ theme }) => theme.colors.white1};
  font-size: ${ fluid(13, 1.8, 14) };
  font-weight: 500;
  padding: ${ rem(12) };
  text-align: center;

  ${ ({ theme: { colors }, colored }) => {
    switch( colored ){
      case "darkBlue": 
        return css`background-color: ${ colors.darkBlue };`
      case "orange":
        return css`background-color: ${ colors.orange };`
      case "grey":
        return css`background-color: ${ colors.grey1 };`
      case "blue":
        return css`background-color: ${ colors.blue };`
      case "red":
        return css`background-color: ${ colors.red };`
      case "borderGray":
        return css `
          border: 1px solid ${ colors.grey2 };
          color: ${ colors.dark2 };
        `
    }
  } }
`

export const SmallButton = styled(BaseButton)`
  padding: ${ rem(8) } ${ rem(12) };
`

export const ColoredBaseButton = styled(BaseButton)<ColoredButtonProps>``
  
export const ColoredMediumButton = styled(ColoredBaseButton)`
  padding: ${ fluid(10, 1.5, 12) } ${ rem(12) };
`

export const ColoredLongRoundButton = styled(BaseButton)<ColoredButtonProps>`
  border-radius: ${ rem(24) };
  min-width: ${ fluid(140, 45, 256) };
`