import styled from "styled-components";
import { 
  rem,
  fluid, 
  breakpoint} from "@/styled/functions";


export const SigninInputBlock = styled.div``

export const SigninInputError = styled.span`
  display: none;
  margin: ${ rem(4) } 0 0 ${ rem(10) };
  text-align: left;

  ${({ theme }) => `
    color: ${ theme.colors.red };
    font-size: ${ rem(13) };
  `}
`

export const SigninInputWrapper = styled.input`
  border-radius: ${ rem(4) };
  font-size: ${ fluid(14, 2, 15) };
  padding: ${ rem(12) } 0 ${ rem(12) } ${ rem(10) };
  width: 100%;

  &[aria-invalid="true"] {

    + ${ SigninInputError } {
      display: block;
    }
  }

  ${({ theme: { colors } }) => `
    border: 1px solid ${ colors.grey3 };
    background-color: ${ colors.white2 };
    color: ${ colors.dark2 };

    &[aria-invalid="true"] {
      border-color: ${ colors.red };
    }
  `}
`