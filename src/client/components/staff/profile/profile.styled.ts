import styled from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"


export const MainWrapper = styled.main`
  padding: ${ rem(24) } ${ rem(16) } ${ fluid(80, 10, 96) };
`

export const MainContentContainer = styled.div`
  max-width: ${ rem(800) };
  margin: 0 auto;
`