import styled from "styled-components"
import { 
  rem,
  fluid, 
  breakpoint} from "@/styled/functions"
import { InitArticleCaption } from "@/styled/shared/article/initial"


export const ArticleImage = styled.img`
  height: ${ rem(100) };

  ${ breakpoint("tablet",`
    grid-column: 2;
    height: ${ fluid(100, 18, 200) };
  `) }

  ${ breakpoint("desktop", `
    grid-column: 1;
  `) }
`

type ArticleTextContainerProps = {
  noPadding?: boolean
}

export const ArticleTextContainer = styled.div<ArticleTextContainerProps>`
  align-content: start;
  display: grid;
  gap: ${ rem(10) } 0;
  line-height: 1.4;
  padding-top: ${ ({ noPadding }) => noPadding? 0 : rem(8) };

  ${ breakpoint("tablet", `
    grid-column: 1;
    grid-row: 1;
  `) }

  ${ breakpoint("desktop", `
    grid-column: 2;
  `) }
`

export const ArticleTitle = styled.h3`
  font-size: ${ fluid(15, 1.2, 16) };
`

export const ArticleWrapper = styled.li`
  display: grid;
  grid-template-columns: ${ rem(100) } 1fr;
  gap: 0 ${ rem(12) };
  padding-bottom: ${ fluid(16, 4, 48) };

  ${ InitArticleCaption } {
    display: none;
  }

  ${ ({ theme: { colors } }) => `
    border-bottom: 1px solid ${ colors.grey3 };

    ${ breakpoint("tablet", `
      border-bottom: none;
      grid-template-columns: 1fr ${ fluid(100, 18, 224) };

      &:nth-of-type(odd) {
        position: relative;

        &::before {
          content: "";
          background-color: ${ colors.white4 };
          height: 1px;
          inset: auto 0 0 0;
          position: absolute;
          width: 1000vw;
        }

        &::after {
          content: "";
          background-color: ${ colors.white4 };
          inset: 0 auto ${ rem(24) } calc(100% + ${ fluid(11, 2, 24) });
          position: absolute;
          width: 1px;
        }
      }
    `) }
  ` }

  ${ breakpoint("desktop", `
    grid-template-columns: ${ fluid(100, 23, 224) } 1fr;

    ${ InitArticleCaption } {
      display: block
    }
  `) }
`