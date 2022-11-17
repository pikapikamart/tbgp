import styled, { css } from "styled-components"
import { 
  breakpoint,
  fluid } from "@/styled/functions"


export const SlateWrapper = styled.div`
  min-height: 80vh;
`

export const HeadingTwo = styled.h2`
  font-family: "Friz Quadrata Std Bold";
  font-size: ${ fluid(22, 3.4, 32) };
  margin-top: ${ fluid(24, 2, 40) };
  margin-bottom: ${ fluid(16, 2, 22) };
`

export const HeadingThree = styled.h3`
  font-family: "Friz Quadrata Std Bold";
  font-size: ${ fluid(20, 3.1, 26) };
  margin-top: ${ fluid(22, 3, 38) };
  margin-bottom: ${ fluid(14, 2, 18) };
`

export const HeadingFour = styled.h4`
  font-family: "Friz Quadrata Std Bold";
  font-size: ${ fluid(18, 2.9, 22) };
  margin-top: ${ fluid(20, 3, 32) };
  margin-bottom: ${ fluid(12, 2, 14) };

  + p {
    margin-top: ${ fluid(8, 1.5, 16) };
  }
`

export const Paragraph = styled.p`
  font-size: ${ fluid(14, 2.5, 18) };
  line-height: 2;
  margin: ${ fluid(14, 2.5, 23) } 0;
`

export const LinkElement = styled.a`
  color: ${ ({ theme }) => theme.colors.blue };
  text-decoration: underline;

  ${ breakpoint("desktop", `

    &:hover {
      cursor: pointer;
    }
  `) }
`

type ImageElementContainerProps = {
  highlight?: boolean
}

export const ImageElement = styled.img`
  margin: 0 auto;
`

export const ImageElementContainer = styled.div<ImageElementContainerProps>`
  margin: ${ fluid(24, 4, 40) } auto;
  max-width: max-content;

  ${ ({ highlight }) => {
    switch(highlight) {
      case true: 
        return css`
        
          ${ ImageElement } {
            box-shadow: 0 0 8px 2px rgba(0, 0, 255, .7);
          }
        `
    }
  } }
`
