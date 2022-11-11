import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";


export const ArticleWrapper = styled.li`
  display: grid;
  grid-template-columns: 1fr ${ fluid(100, 13, 160) };
  gap: 0 ${ rem(10) };
  
  ${ breakpoint("tablet", `
    position: relative;

    &::after {
      content: "";
      background-color: #c9c9c9;
      inset: 0 0 0 calc(100% + ${ fluid(12, 1, 16) });
      position: absolute;
      width: 1px;
    }
  `) }

  ${ breakpoint("desktop", `
    margin-bottom: ${ rem(32) };

    &:first-of-type,
    &:nth-of-type(4) {
      position: relative;

      &::before {
        content: "";
        background-color: #DBDBDB;
        height: 1px;
        inset: calc(100% + ${ rem(32) }) auto auto 0;
        position: absolute;
        width: 100vw;
      }
    }
  `) }
`

export const ArticleLeftBlock = styled.div`
  align-content: start;
  display: grid;
  gap: ${ rem(12) } 0;
`

export const ArticleTitle = styled.h3`
  color: ${ ({ theme }) => theme.colors.dark1 };
  font-size: ${ fluid(15, 1.4, 16) };
  line-height: 1.4;
`

export const ArticleImage = styled.img`
  height: ${ fluid(100, 13, 160) };
`