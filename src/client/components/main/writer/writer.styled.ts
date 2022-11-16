import { 
  customBreakpoint,
  fluid, 
  rem } from "@/styled/functions"
import { InitArticleCaption } from "@/styled/shared/article/initial"
import styled from "styled-components"


export const WriterWrapper = styled.main`
  margin: ${ fluid(56, 6, 64) } auto ${ fluid(96, 10, 128) };
  max-width: ${ rem(848) };
  padding: 0 ${ fluid(16, 2, 24) };
`

export const WriterHeader = styled.div`
  color: ${ ({ theme }) => theme.colors.dark1 };
  margin-bottom: ${ fluid(56, 8.5, 80) };
`

export const AuthorName = styled.h1`
  font-family: "Friz Quadrata Std";
  font-weight: 700;
  font-size: ${ fluid(28, 5, 32) };
  margin-bottom: ${ rem(16) };
`

export const AuthorBio = styled.p`
  font-size: ${ fluid(15, 2, 16) };
  line-height: 1.4;
`

export const ArticlesContainer = styled.div``

export const ArticleList = styled.ul``

export const Article = styled.li`
  border-bottom: 1px solid ${ ({ theme }) => theme.colors.grey4 };
  display: grid;
  gap: 0 ${ rem(12) };
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

export const ArticleTextContainer = styled.div`
  align-content: start;
  display: grid;
  gap: ${ rem(10) } 0;
  padding-top: ${ rem(8) };
`

export const ArticleTitle = styled.h3`
  font-size: ${ fluid(15, 2, 16) };
`

export const ArticleImage = styled.img`
  height: ${ fluid(100, 22, 168) };
`