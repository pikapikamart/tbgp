import styled, { css } from "styled-components"
import { fluid, rem } from "@/styled/functions"


type CoverContainerProps = {
  hasImage: boolean
}

export const CoverContainer = styled.div<CoverContainerProps>`
  max-width: max-content;
  margin: 0 ${ ({ hasImage }) => hasImage? "auto" : "auto 0 0" };
  position: relative;
`

export const CoverImageContainer = styled.div`
  margin-bottom: ${ rem(16) };
`

export const CoverImage = styled.img`
  margin: 0 auto;
`

type CoverButtonProps = {
  isDone?: true
}

export const CoverButton = styled.button<CoverButtonProps>`
  align-items: center;
  border-radius: ${ rem(32) };
  display: flex;
  font-weight: 500;
  font-size: ${ fluid(14, 1.3, 16) };
  padding: ${ fluid(10, 1.4, 12) } ${ fluid(12, 1.3, 16) };

  ${ ({ theme: { colors } }) => `
    border: 1px solid ${ colors.grey2 };
    color: ${ colors.dark3 };
  ` }

  &[aria-disabled="true"] {
    opacity: .7;

    &:hover {
      cursor: not-allowed;
    }
  }

  img {
    margin-right: ${ rem(8) };
  }

  ${ ({ isDone }) => {
    switch(isDone) {
      case true: 
        return css`
          height: 100%;
          inset: 0;
          position: absolute;
          width: 100%;
          z-index: 10;
        `
    }
  } }
`

export const CoverCaption = styled.p`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-size: ${ fluid(12, 1.3, 14) };
  margin-top: ${ rem(8) };
`