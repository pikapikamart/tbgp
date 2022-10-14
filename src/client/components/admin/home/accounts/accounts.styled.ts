import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { DarkLongRoundButton } from "@/styled/collections/button";
import { HomeFrameWrapper } from "../home.styled";


export const AccountsWrapper = styled(HomeFrameWrapper)`
  margin-bottom: ${ rem(16) };

  ${ DarkLongRoundButton } {
    
    &[aria-disabled="true"] {
      background-color: #BDBDBD;
    }
  }

  ${ breakpoint("tablet", `
    flex-basis: 35%;
    margin: 0 ${ fluid(16, 3, 24) } 0 0;
    max-width: ${ rem(352) };
  `) }

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