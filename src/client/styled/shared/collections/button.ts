import styled from "styled-components"
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

export const MediumButton = styled(BaseButton)`
  padding: ${ fluid(10, 1.5, 12) } ${ rem(12) };
`

export const DarkBlueButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.darkBlue};
`

export const DarkLongRoundButton = styled(DarkBlueButton)`
  border-radius: ${ rem(24) };
  min-width: ${ fluid(140, 19, 256) };
`