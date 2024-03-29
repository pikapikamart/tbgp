import styled, { css } from "styled-components";
import { RowStartCenter } from "@/styled/shared/helpers";
import { 
  rem,
  breakpoint } from "@/styled/functions";


type BaseModalWrapperProps = {
  $styleReset?: "true",
  paddingstyle?: string
}

export const ModalDocument = styled.div`
  max-width: 100%;
  padding: ${ rem(96) } ${ rem(16) } ${ rem(64) };
`

export const BaseModalWrapper = styled(RowStartCenter)<BaseModalWrapperProps>`
  background-color: rgba(0, 0, 0, .8);
  inset: 0;
  outline: none;
  overflow: hidden scroll;
  position: fixed;
  z-index: 1200;

  ${ ({ $styleReset, paddingstyle }) => {
    switch($styleReset) {
      case "true": 
        return css`
          display: block;

          ${ ModalDocument } {
            padding: ${ paddingstyle };

            ${ breakpoint("tablet", `
            padding: 0;
          `) }
          }
        `
    }
  } }
`

export const ModalExit = styled.div`
  inset: 0;
  position: absolute;
`

export const ModalFocusBack = styled.div`
  outline: none;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`