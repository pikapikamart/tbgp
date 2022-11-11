import styled, { css } from "styled-components"
import { 
  rem,  
  fluid,
  breakpoint } from "@/styled/functions"
import { InitArticleAuthorsContainer } from "@/styled/shared/article/initial"

  
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
  margin-top: ${ rem(4) };

  ${ breakpoint("tablet", `
  margin-top: 0;
  `) }
`

type VerticalArticleWrapperProps = {
  shouldReverse?: boolean
}

export const VerticalArticleWrapper = styled.li<VerticalArticleWrapperProps>`
  align-content: flex-start;
  display: grid;
  gap: ${ rem(12) } 0;

  ${ breakpoint("tablet", `
    gap: ${ rem(10) } 0;
  `) }

  ${ ({ shouldReverse }) => {
    switch(shouldReverse) {
      case true:
        return css`
          ${ breakpoint("tablet", `

            ${ VerticalImage } {
              grid-row: 1;
            } 

            ${ InitArticleAuthorsContainer } {
              grid-row: 4;
            }
          `) }
        `
      case false:
      default:
        return css`
        
        `
    }
  } }
`