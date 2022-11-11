import styled, { css } from "styled-components"
import { 
  rem,  
  fluid } from "@/styled/functions"


export const TopArticlesWrapper = styled.div`
  max-width: ${ rem(1160) };
  margin: 0 auto;
  padding: 0 ${ fluid(16, 2, 24) };
`