import styled, { css } from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"


const BaseButton = styled.button`
  border-radius: ${ rem(4) };
  color: ${({ theme }) => theme.colors.white1};
  font-size: ${ fluid(13, 1.8, 14) };
  font-weight: 500;
  padding: ${ rem(12) };
  text-align: center;
`

export const SmallButton = styled(BaseButton)`
  padding: ${ fluid(8, 1.3, 10) } ${ rem(12) };
`


type ColoredButtonProps = {
  colored?: "darkBlue" | "green" | "blue" | "red" | "skyBlue" | "violet" | "orange" | "grey"
}

export const ColoredBaseButton = styled(BaseButton)<ColoredButtonProps>`

  ${ ({ theme: { colors }, colored }) => {
    switch( colored ){
      case "darkBlue": 
        return css`background-color: ${ colors.darkBlue };`
      case "orange":
        return css`background-color: ${ colors.orange };`
      case "grey":
        return css`background-color: ${ colors.grey1 };`
    }
  } }
`
  
export const ColoredMediumButton = styled(ColoredBaseButton)`
  padding: ${ fluid(10, 1.5, 12) } ${ rem(12) };
`

export const ColoredLongRoundButton = styled(BaseButton)<ColoredButtonProps>`
  border-radius: ${ rem(24) };
  min-width: ${ fluid(140, 19, 256) };

  ${ ({ theme: { colors }, colored }) => {
    switch( colored ){
      case "darkBlue": 
        return css`background-color: ${ colors.darkBlue }`
      case "orange":
        return css`background-color: ${ colors.orange }`
    }
  } }
`
