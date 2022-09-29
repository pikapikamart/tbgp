import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";


export const AccountsWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: ${ rem(4) };
  padding: ${ rem(16) } ${ rem(8) };

  ${({ theme }) => `
    colors: ${ theme.colors.dark1 };
  `}
`

export const AccountsHeading = styled.h2`
  font-size: ${ fluid(18, 3, 24) };
  font-weight: 600;
  margin-bottom: ${ fluid(4, .7, 8) };
`