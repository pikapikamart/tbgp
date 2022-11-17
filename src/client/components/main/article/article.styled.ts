import styled, { keyframes } from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"


export const ArticleTitle = styled.h1`
  font-family: "Friz Quadrata Std Bold Italic";
  font-weight: 700;
  font-size: ${ fluid(24, 3, 40) };
  font-style: italic;
  line-height: 1.4;
  margin-bottom: ${ rem(16) };
`

export const ArticleCaption = styled.p`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-size: ${ fluid(15, 2, 20) };
  margin-bottom: ${ fluid(16, 2, 20) };
`

export const ArticleBannerContainer = styled.div`
  border-bottom: 1px solid ${ ({ theme }) => theme.colors.grey3 };
  margin-bottom: ${ fluid(24, 3, 32) };
  padding-bottom: ${ fluid(16, 2.2, 24) };
`

export const ArticleImageCaption = styled.p`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-size: ${ fluid(12, 1.3, 14) };
  margin-top: ${ rem(8) };
`

export const ArticleControls = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${ rem(16) };
`

export const ShareToFacebook = styled.div`
  margin-right: ${ rem(12) };

  > button {
    display: grid;
    height: ${ rem(24) };
    place-content: center;
    width: ${ rem(24) };
  }
`

export const CopyLink = styled.button`
  align-items: center;
  display: flex;
  font-size: ${ rem(11) };
  position: relative;
  text-transform: uppercase;

  > img {
    margin-right: ${ rem(2) };
  }
`

const CopyLinkToastAnim = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translateY(0);
  }
  30%, 70% {
    opacity: 1;
    transform: translateY(-100%);
  }
`

export const CopyLinkToast = styled.p`
  animation: ${ CopyLinkToastAnim } .7s ease forwards;
  border-radius: ${ rem(4) };
  display: grid;
  font-size: ${ rem(13) };
  height: ${ rem(32) };
  place-content: center;
  position: absolute;
  text-transform: K;
  width: 100%;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.darkBlue };
    color: ${ colors.white1 };
  ` }
`

export const AuthorsDateContainer = styled.div`
  display: grid;
  gap: ${ rem(10) } 0;
  margin-bottom: ${ fluid(32, 3, 40) };
`

export const ArticleWrapper = styled.main`
  margin: ${ fluid(64, 9, 80) } auto ${ fluid(96, 20, 192) };
  max-width: ${ rem(944) };
  padding: 0 ${ fluid(16, 3, 48) };
`