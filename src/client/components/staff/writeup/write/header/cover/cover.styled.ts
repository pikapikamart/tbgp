import styled, { css } from "styled-components"
import { rem } from "@/styled/functions"


export const CoverContainer = styled.div`
  position: relative;
`

type CoverButtonProps = {
  isDone?: true
}

export const CoverButton = styled.button<CoverButtonProps>`
  align-items: center;
  border-radius: ${ rem(32) };
  display: flex;
  font-weight: 500;
  padding: ${ rem(12) } ${ rem(16) };

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