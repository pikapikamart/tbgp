import { 
  breakpoint, 
  rem } from "@/styled/functions"
import styled from "styled-components"
import { DropdownWrapper } from "../dropdown/dropdown.styled"


export const Hamburger = styled.button`
  border-radius: 50%;
  height: ${ rem(32) };
  position: relative;
  width: ${ rem(32) };

  &[aria-expanded="true"] {
    
    svg {

      &:first-of-type {
        opacity: 0;
      }

      &:last-of-type {
        opacity: 1;
      }
    }

    ~ ${ DropdownWrapper } {
      opacity: 1;
      visibility: visible;
    }
  }

  svg {
    inset: 50% auto auto 50%;
    position: absolute;
    transition: opacity .3s ease;
    transform: scale(1.3) translate(-50%, -50%);

    &:last-of-type {
      opacity: 0;
    }

    g {
      fill: black;
    }
  }

  ${ breakpoint("desktop", `
    display: none;
  `) }
`