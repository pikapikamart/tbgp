import styled, { css } from "styled-components"
import { 
  rem,  
  fluid } from "@/styled/functions"


type InitArticleMainHeadingProps = {
  size?: "small",
  alignment?: "left"
}

export const InitArticleMainHeading = styled.h2<InitArticleMainHeadingProps>`
  margin-bottom: ${ fluid(24, 3, 32) };
  position: relative;

  ${ ({ size }) => {
    switch(size) {
      case "small":
        return css`
          font-size: ${ fluid(18, 3, 26) };
        `
      default:
        return css`
          font-size: ${ fluid(20, 3.2, 32) };
        `
    }
  } }

  &::before {
    content: "";
    height: ${ rem(3) };
    inset: calc(50% - ${ rem(1.5) }) auto auto 0;
    position: absolute;
    width: 100%;
  }

  > span {
    font-family:'Friz Quadrata Std Bold';
    font-weight: 700;
    position: relative;
    z-index: 10;
  }

  ${ ({ theme: { colors } }) => `
    color: ${ colors.dark1 };

    &::before {
      background-color: ${ colors.yellow };
    }

    > span {
      background-color: ${ colors.white1 };
    }
  `}

  ${ ({ alignment }) => {
    switch (alignment) {
      case "left":
        return css`
          text-align: left;

          > span {
            padding: 0 ${ rem(8) } 0 0;
          }
        `
      default:
        return css`
          text-align: center;

          > span {
            padding: 0 ${ rem(8) };
          }
        `
    }
  } }
`

export const InitArticleCategory = styled.p`
  position: relative;

  &::before {
    content: "";
    background-color: ${ ({ theme }) => theme.colors.grey3 };
    height: ${ rem(1) };
    inset: calc(50% - 1px) auto auto 0;
    position: absolute;
    width: 100%;
  }

  > span {
    font-size: ${ rem(13) };
    margin-left: ${ rem(8) };
    padding: 0 ${ rem(4) };
    position: relative;
    text-transform: uppercase;

    ${ ({ theme: { colors } }) => `
      background-color: ${ colors.white1 };
      color: ${ colors.dark3 };
    ` }
  }
`

export const InitArticleAuthorsContainer = styled.div`
  align-content: center;
  color: ${ ({ theme }) => theme.colors.dark1 };
  display: flex;
  flex-wrap: wrap;
  font-size: ${ rem(13) };
  font-weight: 600;

  > span {
    margin-right: ${ rem(2) };
  }
`

export const InitArticleAuthorsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin:0 ${ rem(24) } ${ rem(8) } 0;
`

export const InitArticleAuthorsListItem = styled.li`

`

export const InitArticleDate = styled.div`
  align-items: center;
  color: ${ ({ theme }) => theme.colors.dark2 };
  display: flex;
  font-size: ${ rem(13) };
  font-weight: 400;

  > img {
    margin-right: ${ rem(8) };
  }
`

type InitArticleCaptionProps = {
  size?: "medium"
}

export const InitArticleCaption = styled.p<InitArticleCaptionProps>`
  color: ${ ({ theme }) => theme.colors.dark3 };
  line-height: 1.4;

  ${ ({ size }) => {
    switch(size) {
      case "medium":
        return css`
          font-size: ${ fluid(14, 1.5, 15) };
        `
      default: 
        return css`
          font-size: ${ fluid(15, 1.5, 16) };
        `
    }
  } }
`

export const InitArticleBannerImageCube = styled.img`
  max-width: ${ fluid(100, 15, 160) };
`