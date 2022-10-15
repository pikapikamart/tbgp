import styled from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"
import { ColoredLongRoundButton } from "@/styled/collections/button"


export const VerificationDescription = styled.p`
  font-size: ${ fluid(15, 1.4, 17) };
  margin: ${ rem(24) } 0 ${ rem(32) };

  > span {
    font-weight: 600;
  }
`

type VerificationChoiceProps = {
  accepted: boolean
}

export const VerificationChoice = styled(ColoredLongRoundButton)<VerificationChoiceProps>`
  background-color: ${({ accepted, theme }) => accepted? theme.colors.blue : theme.colors.red };
  margin-bottom: ${ rem(8) };
`

export const VerificationClose = styled(ColoredLongRoundButton)`

  ${({ theme: { colors } }) => `
    background-color: ${ colors.white3 };
    border: 1px solid ${ colors.grey4 };
    color: ${ colors.dark2 };
  `}
`