import styled, { keyframes } from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { 
  RowCenter, 
  RowCenterCenter } from "../helpers";
import { DropdownWrapper } from "./dropdown";


const scrollIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const scrollOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`


export const HeaderWrapper = styled(RowCenter)`
  background-color: ${({ theme }) => theme.colors.white1};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .2);
  height: ${ fluid(56, 8, 60) };
  justify-content: space-between;
  padding: 0 ${ rem(24) };
  position: relative;
  z-index: 100;

  &.scroll-in {
    animation: ${scrollIn} 1s ease forwards;
    box-shadow: 0 0 ${rem(16)} 0 rgba(0, 0, 0, .2);
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
  }
  
  &.scroll-out {
    animation: ${scrollOut} .45s ease forwards;
  }

  ${ breakpoint("desktop", `
    padding: 0 ${ rem(48) };
  `) }
`

export const HeaderLogoWrapper = styled.img`
  height: ${ fluid(36, 5.5, 48) };
`

export const HeaderMenuIcon = styled.span`
  background: url("/icons/hamburger-open.svg") no-repeat center center;
  height: ${ rem(12) };
  margin-right: ${ rem(8) };
  width: ${ rem(12) };
`

export const HeaderMenu = styled(RowCenterCenter)`
  border-radius: ${ rem(4) };
  height: ${ rem(32) };
  width: ${ rem(80) };

  ${({ theme: { colors } }) => `
    background-color: ${ colors.darkBlue };
    color: ${ colors.white1 };
    font-size: ${ rem(14) };
    font-weight: 500;
  `}

  &[aria-expanded="true"] {

    > ${ HeaderMenuIcon } {
      background-image: url("/icons/hamburger-close.svg");
    }

    ~ ${ DropdownWrapper } {
      opacity: 1;
      visibility: visible;
    }
  }

  ${ breakpoint("tablet", `
    display: none;
  `) }
`



