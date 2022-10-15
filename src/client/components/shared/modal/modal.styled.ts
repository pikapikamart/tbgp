import styled from "styled-components";
import { 
  fluid, 
  rem } from "@/styled/functions";
import { RowCenterCenter } from "@/styled/shared/helpers";


export const BaseModalWrapper = styled(RowCenterCenter)`
  background-color: rgba(0, 0, 0, .8);
  inset: 0;
  outline: none;
  position: fixed;
  z-index: 100;
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