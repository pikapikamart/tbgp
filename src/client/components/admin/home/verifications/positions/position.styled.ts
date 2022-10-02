import styled from "styled-components"
import {
  rem,
  fluid
} from "@/styled/functions"


export const PositionsWrapper = styled.ul`

`

export const Position = styled.li`
  border-radius: ${ rem(4) };
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  padding: ${ rem(12) };
`