import styled, { css } from "styled-components"
import { 
  rem,  
  fluid,
  breakpoint } from "@/styled/functions"


export const VerticalArticleWrapper = styled.li`
  display: grid;
`

type VerticalArticleTitleProps = {
  titleFormat: "one" | "two" | "three"
}

export const VerticalArticleTitle = styled.h3<VerticalArticleTitleProps>`
  color: ${ ({ theme }) => theme.colors.dark1 };
  font-size: ${ rem(20) };
  line-height: 1.4;

  ${ ({ titleFormat }) => {
    switch(titleFormat) {
      case "one":
        return css`
          ${ breakpoint("tablet",`
            font-size: ${ fluid(15, 1.5, 16) };
          `) }
        `
      case "two":
        return css`
          ${ breakpoint("tablet",`
            font-size: ${ fluid(18, 2, 20) };
          `) }
        `
      case "three":
        return css`
          ${ breakpoint("desktop", `
            font-size: ${ rem(16) };
          `) }
        `
    }
  } }
`

export const VerticalImage = styled.img`
  
`