import styled from "styled-components"
import { 
  rem,
  breakpoint } from "@/styled/functions"


export const ComboBoxWrapper = styled.div``

export const ComboBoxLabel = styled.label`
  font-size: ${ rem(17) };
  margin-top: ${ rem(10) };
`

export const ComboBoxContentContainer = styled.div`
  position: relative;
`

export const ListBox = styled.div`
  background-color: ${ ({ theme }) => theme.colors.white1 };
  border-radius: ${ rem(8) };
  display: none;
  outline: none;
  padding: ${ rem(8) } ${ rem(16) };
  position: absolute;
  top: calc(100% + ${ rem(6) });
  z-index: 50;
  width: 100%;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey3 };
  ` }
`

export const ComboBoxRole = styled.button`
  background: url("/icons/icon-triangle.svg") no-repeat calc(100% - ${ rem(14) }) center;
  border-bottom: 1px solid ${ ({ theme }) => theme.colors.grey1 };
  font-weight: 600;
  height: ${ rem(32) };
  padding-top: ${ rem(2) };
  width: 100%;

  &[aria-expanded="true"] {

    + ${ ListBox } {
      display: block;
    }
  }
`

export const ListBoxItem = styled.div`
  border-radius: ${ rem(8) };
  font-weight: 500;
  font-size: ${ rem(15) };
  padding: ${ rem(6) } ${ rem(8) };

  ${ ({ theme: { colors } }) => `
    color: ${ colors.dark3 };

    &[aria-selectd="true"],
    &.selected {
      background-color: ${ colors.whiteBlue1 };
    }
  ` }

  ${ breakpoint("desktop", `
    
    &:hover {
      cursor: pointer;
    }
  `) }
`