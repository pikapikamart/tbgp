import styled from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"


export const MoreArticlesWrapper = styled.div` 
  margin-bottom: ${ fluid(96, 14.5, 128) };
  padding: 0 ${ fluid(16, 4, 64) };

  ${ breakpoint("desktop", `
    padding: 0 ${ rem(64) };
  `) }
`

export const MoreArticlesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${ rem(240) }, 1fr));
  gap: ${ rem(32) } ${ fluid(24, 4, 48) };

  ${ breakpoint("tablet", `
    grid-template-columns: repeat(2, 1fr);
  `) }
`