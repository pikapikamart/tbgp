import styled from "styled-components"
import { 
  rem,
  breakpoint } from "@/styled/functions"


export const RequestPositionWrapper = styled.form`
  display: grid;
  justify-items: center;
  max-width: ${ rem(224) };
  margin: 0 auto;

  ${ breakpoint("tablet", `
    margin-top: ${ rem(12) };
  `) }
`