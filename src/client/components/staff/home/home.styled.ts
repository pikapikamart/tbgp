import styled from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"


export const MainWrapper = styled.main`
  padding: ${ rem(16) } ${ rem(24) } ${ fluid(80, 13, 96) };

  ${ breakpoint("desktop", `
    padding-top: ${ rem(12) };
  `) }
`

export const MainContentContainer = styled.div`
  margin: 0 auto;
  max-width: ${ rem(1224) };

  ${ breakpoint("desktop", `
    align-items: flex-start;
    display: flex;
  `) }
`
