import styled from "styled-components";
import { 
  rem,
  fluid, 
  breakpoint,
  customBreakpoint} from "@/styled/functions";
import { 
  InitArticleAuthorsContainer, 
  InitArticleCaption } from "@/styled/shared/article/initial";


export const ArticleTitle = styled.h2`
  font-size: ${ fluid(15, 1.2, 16) };
  font-weight: 700;
`

export const ArticleImage = styled.img`
  height: ${ fluid(100, 10, 112) };
`

export const ArticleContentContainer = styled.div`
  align-items: start;
  align-content: start;
  display: grid;
  gap: ${ rem(10) };
`

export const ArticleWrapper = styled.li`
  align-items: start;
  align-content: start;
  display: grid;
  grid-template-columns: 1fr ${ fluid(100, 10, 128) };
  gap: ${ rem(16) } ${ rem(10) };  
  line-height: 1.4;
  
  &:first-of-type,
  &:nth-of-type(2) {
    grid-template-columns: 1fr;

    ${ ArticleTitle } {
      font-size: ${ rem(20) };
    }

    ${ InitArticleAuthorsContainer } {
      margin: ${ rem(2) } 0 ${ rem(4) };
    }

    ${ ArticleImage } {
      margin-top: ${ rem(4) };
    }
  }

  ${ InitArticleCaption } {
    display: none
  }

  &:first-of-type,
  &:nth-of-type(2) {

    ${ ArticleImage } {
      height: revert;
    }
    
    ${ InitArticleCaption } {
      display: block;
    }
  }

  ${ breakpoint("tablet", `

    &:nth-of-type(2n) {
      grid-column: 2/3;
    }

    &:first-of-type,
    &:nth-of-type(2) {
      border-bottom: 1px solid #c9c9c9;
      gap: ${ rem(16) } 0;
      grid-column: 1/-1;
      grid-template-columns: 1fr ${ fluid(410, 20, 480) };
      padding-bottom: ${ rem(24) };
    }

    &:nth-of-type(3) {
      grid-row: 3/6;
      grid-template-columns: 1fr;
      position: relative;

      &::after {
        content: "";
        background-color: #c9c9c9;
        inset: 0 auto 0 calc(100% + ${rem(9) });
        position: absolute;
        width: 1px;
      }

      ${ ArticleImage } {
        height: revert;
        grid-row: 1;
      }

      ${ InitArticleAuthorsContainer } {
        grid-row: 3;
      }

      ${ InitArticleCaption } {
        display: block;
      }
    }

    &:nth-of-type(n+4) {
      border-bottom: 1px solid #c9c9c9;
      padding-bottom: ${ rem(12) };
    }

  `) }

  ${ customBreakpoint(1100, `
    
    &:first-of-type,
    &:nth-of-type(2) {
      grid-column: 1/2;

      ${ ArticleImage } {
        grid-row: 1;
        grid-column: 2;
      }
    }

    &:first-of-type {
      grid-row: 1/3;
      position: relative;

      &::after {
        content: "";
        background-color: #dbdbdb;
        height: 1000vh;
        inset: 0 auto auto calc(100% + ${ rem(15) });
        position: absolute;
        width: 1px;
      }
    }

    &:nth-of-type(2) {
      grid-row: 3/5;
    }

    &:nth-of-type(n+3) {
      border-bottom: 1px solid #c9c9c9;
      grid-column: 2/3;
      grid-template-columns: ${ rem(128) } 1fr;
      padding-bottom: ${ rem(24) };

      &::after {
        display: none;
      }

      ${ InitArticleAuthorsContainer } {
        grid-row: 2;
      }

      ${ InitArticleCaption } {
        display: none;
      }

      ${ ArticleImage } {
        grid-column: 1;
        grid-row:1;
        height: ${ fluid(100, 10, 112) };
      }
    }

    &:nth-of-type(3) {
      grid-row: 1;
    }
  `) }
`

