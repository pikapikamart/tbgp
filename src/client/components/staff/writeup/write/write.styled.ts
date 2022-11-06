import styled from "styled-components"
import { 
  breakpoint, 
  rem } from "@/styled/functions"


export const WriteWrapper = styled.div`
  padding-top: ${ rem(48) };

  ${ breakpoint("tablet", `
    padding-top: ${ rem(80) };
  `) }
`