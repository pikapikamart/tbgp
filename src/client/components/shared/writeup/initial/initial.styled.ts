import styled from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"


export const InitialWriteupWrapper = styled.li`
  border-radius: ${ rem(4) };
  border: 1px solid ${ ({ theme }) => theme.colors.grey3 };
  padding: ${ fluid(12, 3.3, 24) } ${ fluid(16, 4.3, 32) };
`

export const WriteupTitle = styled.h2`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-size: ${ fluid(15, 2.5, 16) };
  margin-bottom: ${ fluid(4, .5, 8) };
`

export const WriteupCaption = styled.p`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-size: ${ fluid(13, 2, 14) };
`