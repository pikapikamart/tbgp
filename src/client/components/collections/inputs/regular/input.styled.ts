import styled, { css } from "styled-components"
import { 
  rem,
  fluid } from "@/styled/functions"


export const InputBlock = styled.div``

export const InputLabel = styled.label`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-size: ${ fluid(14, 1.2, 15) };
  font-weight: 700;
  margin-bottom: ${ rem(2) };
`

export const InputError = styled.span`
  display: none;
  margin: ${ rem(4) } 0 0 ${ rem(10) };
  text-align: left;

  ${({ theme }) => `
    color: ${ theme.colors.red };
    font-size: ${ rem(13) };
  `}
`

export const InputWrapper = styled.input`
  border-radius: ${ rem(4) };
  font-size: ${ fluid(14, 2, 16) };
  padding: ${ rem(12) } 0 ${ rem(12) } ${ rem(10) };
  width: 100%;

  &[aria-invalid="true"] {

    + ${ InputError } {
      display: block;
    }
  }

  ${({ theme: { colors } }) => `
    border: 1px solid ${ colors.grey3 };
    color: ${ colors.dark2 };

    &[aria-invalid="true"] {
      border-color: ${ colors.red };
    }
  `}
`