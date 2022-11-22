import { 
  breakpoint,
  fluid, 
  rem } from "@/styled/functions"
import styled from "styled-components"


export const ArticleImage = styled.img`
  margin-top: ${ rem(4) };

  ${ breakpoint("tablet", `
    margin-top: 0;
  `) }
`

export const ArticleTitle = styled.h3`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-size: ${ fluid(18, 3, 32) };
  line-height: 1.4;
`

export const ArticleWrapper = styled.div`
  align-content: flex-start;
  display: grid;
  gap: ${ rem(12) } 0;

  ${ breakpoint("tablet", `
    gap: ${ rem(10) } 0;
  `) }
`