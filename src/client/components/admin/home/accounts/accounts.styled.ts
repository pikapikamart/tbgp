import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { DarkLongRoundButton } from "@/styled/shared/collection";


export const AccountsWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: ${ rem(4) };
  padding: ${ rem(16) } ${ rem(8) };

  ${({ theme }) => `
    color: ${ theme.colors.dark1 };
  `}

  ${ DarkLongRoundButton } {
    
    &[aria-disabled="true"] {
      background-color: #BDBDBD;
    }
  }

  ${ breakpoint("desktop", `

    ${ DarkLongRoundButton } {

      &[aria-disabled="true"] {
        
        &:hover {
          cursor: not-allowed;
        }
      }
    }
  `) }
`

export const AccountsHeading = styled.h2`
  font-size: ${ fluid(18, 3, 24) };
  font-weight: 600;
  margin-bottom: ${ fluid(4, .7, 8) };
`