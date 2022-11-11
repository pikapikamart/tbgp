import styled from "styled-components"
import { 
  rem,  
  fluid, 
  breakpoint} from "@/styled/functions"
import { VerticalArticleWrapper } from "@/components/shared/article/vertical/vertical.styled"
import { 
  InitArticleCaption,
  InitArticleCategory } from "@/styled/shared/article/initial"


export const TopArticlesWrapper = styled.div`
  max-width: ${ rem(1160) };
  margin: 0 auto ${ fluid(64, 10.5, 96) };
  padding: 0 ${ fluid(16, 2, 24) };
`

export const TopArticlesList = styled.ul`
  display: grid;
  gap: ${ rem(32) };
  grid-template-columns: repeat(auto-fill, minmax(${ rem(240) }, 1fr));

  ${ VerticalArticleWrapper } {
    
    &:nth-of-type(3) {
      grid-column: 1/-1;

      > img {
        margin: ${ rem(4) } auto 0;
      }
    }
  }

  ${ breakpoint("tablet", `
    grid-template-columns: repeat(10, 1fr);
    gap: ${ rem(24) } ${ rem(32) };

    ${ VerticalArticleWrapper } {

        &:nth-of-type(3){
          position: relative;

          &::before {
            content: "";
            background-color: #C9C9C9;
            inset: 0 auto 0 -${ rem(15) }; 
            position: absolute;
            width: 1px;
          }
        }
      
        &:first-of-type,
        &:nth-of-type(2){
          grid-column: 1/5;

          > img {
            max-height: ${ rem(140) };
            width: 100%;
          }

          ${ InitArticleCaption } {
            display: none;
          }
        }

        &:nth-of-type(3) {
          grid-row: 1/3;
          grid-column: 5/-1
        }

        &:nth-of-type(4),
        &:nth-of-type(5) {
          margin-top: ${ rem(32) };
        } 
        
        &:nth-of-type(4),
        &:nth-of-type(6) {
          grid-column: 1/6;
        } 

        &:nth-of-type(5),
        &:nth-of-type(7) {
          grid-column: 6/-1;
        } 
    }
  `) }

  ${ breakpoint('desktop', `
    align-items: flex-start;
    grid-template-columns: 1fr ${ fluid(400, 39, 520) } 1fr;
    gap: ${ rem(24) } ${ rem(48) };  

    ${ VerticalArticleWrapper } {

      &:first-of-type {
        grid-column: 1/2;
        grid-row: 1/3;
      }

      &:nth-of-type(2) {
        grid-column: 1/2;
        grid-row:3/5;
      }

      &:nth-of-type(3) {
        grid-column: 2/3;
        grid-row: 1/5;
      }

      &:nth-child(n+4) {
        grid-column: 3/4;
        border-bottom: 1px solid #c9c9c9;
        margin-top: 0;
        padding-bottom: ${ rem(16) };

        ${ InitArticleCategory } {
          grid-row: 3;

          &::before {
            display: none;
          }

          span {
            margin-left: 0;
            padding: 0;
          }
        }
      }
    }
  `) }
`