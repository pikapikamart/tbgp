import styled, { keyframes } from "styled-components"
import {
  rem,
  breakpoint,
  fluid
} from "@/styled/functions"
import { RowCenterCenter } from "@/styled/shared/helpers"
import { ColoredMediumButton } from "@/styled/collections/button"


export const ControlsContainer = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  max-width: max-content;
  margin: 0 auto;
  position: sticky;
  z-index: 1000;

  ${ breakpoint("tablet", `
    flex-direction: column-reverse;
    top: 0;
  `) }
`

export const ControlsSelections = styled(RowCenterCenter)`
  border-radius: ${ rem(8) } ${ rem(8) } 0 0;
  border-bottom: none;
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
  ` }

  ${ ({ theme: { colors } }) => `
  
    ${ breakpoint("tablet", `
      border-radius: 0 0 ${ rem(8) } ${ rem(8) };
      border-bottom: 1px solid ${ colors.grey4 };
      border-top: none;
    `) }
  ` }
`

export const ControlsUpdates = styled.div`
  margin-right: ${ fluid(12, 4, 48) };

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
  border-radius: ${ rem(24) } ${ rem(24) } 0 0;
  height: ${ rem(16) };
  position: relative;
  transform: translateY(1px);
  width: ${ rem(32) };
  z-index: 5;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey3 };
  ` }

  border-bottom: none;

  &::before {
    content: "";
    background: url("/icons/icon-dropdown-down.svg") no-repeat center top;
    height: 100%;
    inset: 0 auto auto 0;
    position: absolute;
    transform: rotateX(-180deg);
    width: 100%;
  }

  ${ breakpoint('tablet', `
    border-top: none;
    border-bottom: 1px;
    border-radius: 0 0 ${ rem(24) } ${ rem(24) };
    transform: translateY(-1px);

    &::before {
      transform: revert;
    }
  `) }

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