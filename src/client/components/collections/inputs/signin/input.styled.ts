import styled from "styled-components";
import { rem } from "@/styled/functions";
import { InputWrapper } from "../regular/input.styled";


export const SigninInputWrapper = styled(InputWrapper)`
  padding: ${ rem(12) } 0 ${ rem(12) } ${ rem(10) };
  width: 100%;

  ${({ theme: { colors } }) => `
    background-color: ${ colors.white2 };
  `}
`