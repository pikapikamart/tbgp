import styled from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"


export const HeadingTwo = styled.h2`
  font-family: "Friz Quadrata Std Bold Italic";
  font-size: ${ fluid(21, 2.5, 32) };
  margin-top: ${ fluid(12, 1.3, 16) };
  margin-bottom: ${ fluid(16, 2, 22) };
`

export const HeadingThree = styled.h2`
  font-family: "Friz Quadrata Std Bold Italic";
  font-size: ${ fluid(19, 2.5, 26) };
  margin-top: ${ fluid(12, 1.3, 16) };
  margin-bottom: ${ fluid(14, 2, 18) };
`

export const HeadingFour = styled.h2`
  font-family: "Friz Quadrata Std Bold Italic";
  font-size: ${ fluid(16, 2.5, 22) };
  margin-top: ${ fluid(12, 1.3, 16) };
  margin-bottom: ${ fluid(12, 2, 14) };
`

export const Paragraph = styled.p`
  font-size: ${ fluid(14, 1.5, 18) };
  line-height: 1.8;
  margin: ${ fluid(14, 2.5, 23) } 0;
`

export const LinkElement = styled.a`
  color: ${ ({ theme }) => theme.colors.blue };
  text-decoration: underline;
`