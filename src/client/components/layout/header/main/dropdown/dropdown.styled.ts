import { rem } from "@/styled/functions"
import styled from "styled-components"


export const DropdownWrapper = styled.div`
  inset: 100% auto auto 0;
  min-height: 100vh;
  opacity: 0;
  padding: ${ rem(32) } ${ rem(40) };
  position: absolute;
  transition: 
    opacity .3s ease,
    visibility .3s ease;
  visibility: hidden;
  width: 100%;
  z-index: 100;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border-top: 1px solid ${ colors.grey3 };
  ` }
`