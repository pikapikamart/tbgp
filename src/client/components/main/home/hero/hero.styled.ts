import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";


export const HeroWrapper = styled.div`
  background: url("/stock/hero-mobile.png") no-repeat center center;
  background-size: cover;
  margin-bottom: ${ fluid(56, 8.5, 80) };
  min-height: ${ fluid(336, 61, 592) };
  padding: ${ fluid(48, 9, 64) } ${ rem(24) };

  ${ breakpoint("tablet", `
    background-image: url("/stock/hero-tablet.png");
  `) }

  ${ breakpoint("desktop", `
    background-image: url("/stock/hero.png");
  `) }
`

export const HeroContentContainer = styled.div`
  display: grid;
  justify-items: center;
  max-width: ${ rem(598) };
  margin: 0 auto;
  text-align: center;
`

export const HeroLogo = styled.img`
  max-width: ${ fluid(80, 15, 144) };
`

export const HeroHeading = styled.h1`
  color: ${ ({ theme }) => theme.colors.white1 };
  font-family: "Friz Quadrata Std Medium";
  font-size: ${ fluid(20, 4.2, 44) };
  font-weight: 500;
  line-height: 1.3;
  margin: ${ fluid(8, 1.7, 12) } 0 ${ fluid(12, 2.3, 16) };
  text-transform: uppercase;
`

export const HeroCaption = styled.p`
  color: ${ ({ theme }) => theme.colors.white4 };
  font-size: ${ fluid(14, 2.1, 18) };
  font-weight: 300;
  line-height: 1.4;
  max-width: ${ rem(528) };
`