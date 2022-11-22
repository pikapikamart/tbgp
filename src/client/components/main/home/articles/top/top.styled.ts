import styled from "styled-components"
import { 
  rem,  
  fluid, 
  breakpoint} from "@/styled/functions"
import { InitArticleCaption } from "@/styled/shared/article/initial"
import { 
  ArticleWrapper,
  ArticleImage,
  ArticleTitle } from "./article/article.styled"


export const TopArticlesWrapper = styled.div`
  max-width: ${ rem(1160) };
  margin: 0 auto ${ fluid(64, 10.5, 96) };
  padding: 0 ${ fluid(16, 2, 24) };
`

const BaseArticlesList = styled.div`
  display: grid;
  gap: ${ rem(32) };
  grid-template-columns: repeat(auto-fill, minmax(${ rem(240) }, 1fr));
`

export const TopArticlesWithImage = styled(BaseArticlesList)`
  margin-bottom: ${ fluid(48, 6, 64) };

  ${ breakpoint("tablet", `
    grid-template-columns: ${ fluid(240, 30, 300) } 1fr;
  `) }

  ${ breakpoint('desktop',`
    gap: ${ rem(32) } ${ rem(48) };
    grid-template-columns: max(${ fluid(220, 20, 248) }) ${ fluid(400, 39, 520) };
  `) }

  ${ ArticleWrapper } {
    &:last-of-type {
      grid-column: 1 / -1;

      ${ ArticleImage } {
        margin: ${ rem(4) } auto 0;

        ${ breakpoint("tablet", `
          margin: 0 auto;
        `) }
      }
    }

    ${ breakpoint("tablet", `
        
        &:nth-of-type(3){
          grid-column: 2/3;
          grid-row: 1/3;
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
          grid-column: 1/2;
  
          ${ ArticleImage } {
            max-height: ${ rem(140) };
          }
  
          ${ ArticleTitle } {
            font-size: ${ fluid(15, 1.5, 16) };
          }
  
          ${ InitArticleCaption } {
            display: none;
          }
        }

        ${ ArticleImage } {
          grid-row: 1;
          width: 100%;
        }
      `) }

    ${ breakpoint("desktop", `
        &:nth-of-type(3){
        
          &::before,
          &::after {
            content: "";
            background-color: #C9C9C9;
            position: absolute;
            width: 1px;
          }

          &::before {
            inset: 0 auto 0 -${ rem(24) };
          }

          &::after {
            inset: 0 -${ rem(24) } 0 auto;
          }

          ${ ArticleTitle } {
            font-size: ${ rem(20) };
          }
        }
    `) }
  }
`

export const RemainingTopArticles = styled(BaseArticlesList)`

  ${ breakpoint('tablet', `
    grid-template-columns: repeat(2, 1fr);

    ${ ArticleTitle } {
      font-size: ${ rem(20) };  q
    }
  `) }

  ${ breakpoint('desktop', `
    display: block;
    grid-column: 2 / 3;

    ${ ArticleWrapper } {

      &:not(:last-of-type) {
        margin-bottom: ${ rem(32) };
      }
    }

    ${ ArticleTitle } {
      font-size: ${ rem(16) };
    }
  `) }
`

export const MainContentContainer = styled.div`

  ${ breakpoint("desktop", `
    align-items: start;
    display: grid;
    gap: 0 ${ rem(48) };
    grid-template-columns: auto max(${ fluid(220, 20, 248) });
  `) }
`