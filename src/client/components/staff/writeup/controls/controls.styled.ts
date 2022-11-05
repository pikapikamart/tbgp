import styled, { keyframes } from "styled-components"
import {
  rem,
  breakpoint
} from "@/styled/functions"
import { RowCenterCenter } from "@/styled/shared/helpers"
import { ColoredMediumButton } from "@/styled/collections/button"


export const ControlsContainer = styled.div`

  ${ breakpoint("tablet", `
    align-items: center;
    display: flex;
    flex-direction: column-reverse;
    position: sticky;
    top: 0;
    z-index: 1000;
  `) }
`

export const ControlsSelections = styled(RowCenterCenter)`
  border-radius: 0 0 ${ rem(8) } ${ rem(8) };
  max-height: 0;
  height: ${ rem(60) };
  overflow: hidden;
  padding: 0 ${ rem(32) };
  position: relative;
  transition: 
    max-height .3s ease,
    padding-bottom .3s ease, 
    visibility .3s ease;
  visibility: hidden;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey4 };
    border-top: none;
  ` }
`

export const ControlsUpdates = styled.div`
  margin-right: ${ rem(48) };

  ${ ColoredMediumButton } {

    &:not(:last-of-type) {
      margin-right: ${ rem(8) };
    }
  }
`

export const ControlsMenu = styled.button`
  background: url("/icons/icon-hamburger-dark.svg") no-repeat center center;
  border-radius: 50%;
  height: ${ rem(36) };
  width: ${ rem(36) };
`

export const TopPull = styled.button`

  ${ ({ theme: { colors } }) => `
    ${ breakpoint("tablet", `
      background: url("/icons/icon-dropdown-down.svg") no-repeat center top;
      background-color: ${ colors.white1 };
      border-radius: 0 0 ${ rem(24) } ${ rem(24) };
      border: 1px solid ${ colors.grey3 };
      border-top: none;
      height: ${ rem(16) };
      transform: translateY(-1px);
      width: ${ rem(32) };
    `) }
  ` }

  &[aria-expanded="true"] {

    + ${ ControlsSelections } {
      max-height: ${ rem(100) };
      padding-bottom: ${ rem(4) };
      visibility: visible;
    }
  }
`

const SaveControlToastAnim = keyframes`
  0%, 100% {
    transform: translateY(-100%);
  }

  25%, 70% {
    transform: translateY(0);
  }
`

export const SaveControlToast = styled.p`
  animation: ${ SaveControlToastAnim } 1s ease-out forwards;
  align-items: center;
  display: flex;
  font-weight: 600;
  height: 100%;
  inset: 0 auto auto 0;
  justify-content: center;
  position: absolute;
  width: 100%;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.greenBlue };
    color: ${ colors.white1 };
  ` }

  svg {
    margin-right: ${ rem(6) };
  }
`