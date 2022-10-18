import styled from "styled-components";
import { RowStartCenter } from "@/styled/shared/helpers";
import { rem } from "@/styled/functions";


export const BaseModalWrapper = styled(RowStartCenter)`
  background-color: rgba(0, 0, 0, .8);
  inset: 0;
  outline: none;
  overflow-y: scroll;
  position: fixed;
  z-index: 100;
`

export const ModalDocument = styled.div`
  max-width: 100%;
  padding: ${ rem(96) } ${ rem(16) } ${ rem(64) };
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