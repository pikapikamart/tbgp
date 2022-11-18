import styled from "styled-components"
import { 
  rem,
  fluid, 
  breakpoint,
  customBreakpoint} from "@/styled/functions"
import { InitArticleCaption } from "@/styled/shared/article/initial"


export const ArticleTextContainer = styled.div`
  align-content: start;
  display: grid;
  gap: ${ rem(10) } 0;
  padding-top: ${ rem(8) };
`

export const ArticleTitle = styled.h2`
  font-size: ${ fluid(15, 1.5, 16) };
`

export const ArticleImage = styled.img`
  height: ${ fluid(100, 22, 168) };
`

export const ArticleWrapper = styled.li`
  border-bottom: 1px solid ${ ({ theme }) => theme.colors.grey3 };
  display: grid;
  gap: 0 ${ rem(10) };
  grid-template-columns: 1fr ${ fluid(100, 30, 224) };
  padding-bottom: ${ rem(24) };

  &:not(:last-of-type) {
    margin-bottom: ${ rem(32) };
  }

  ${ InitArticleCaption } {
    display: none;
  }

  ${ customBreakpoint(500, `
    ${ InitArticleCaption } {
      display: block;
    }
  `) }
`