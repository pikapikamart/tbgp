import styled, { css } from "styled-components"
import { 
  rem,
  breakpoint } from "@/styled/functions"
import { 
  InputError,
  InputLabel, 
  InputWrapper } from "@/components/collections/inputs/regular/input.styled"


export const ComboBoxWrapper = styled.div``

export const ComboBoxLabel = styled(InputLabel)``

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

type ComboBoxRoleProps = {
  bottomBorder?: boolean
}

export const ComboBoxRole = styled(InputWrapper)<ComboBoxRoleProps>`
  background: url("/icons/icon-triangle.svg") no-repeat calc(100% - ${ rem(14) }) center;
  font-weight: 600;
  min-height: ${ rem(43) };
  padding-left: 0;
  text-align: left;
  width: 100%;

  &[aria-expanded="true"] {

    + ${ ListBox } {
      display: block;
    }
  }
`

export const ListBoxItem = styled.div.attrs(({ className }) =>({
  className
}))`
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

export const ComboBoxError = styled(InputError)``

export const ComboBoxInput = styled.input`
  
  &[aria-invalid] {

    & ~ ${ ComboBoxContentContainer } {

      ${ ComboBoxRole } {
        border-color: ${ ({ theme }) => theme.colors.red };
      }
    }
    
    & ~ ${ ComboBoxError } {
      display: block;
    }
  }
`