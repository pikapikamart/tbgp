import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { ColoredLongRoundButton } from "@/styled/collections/button";
import { HomeFrameWrapper } from "../home.styled";


export const AccountsWrapper = styled(HomeFrameWrapper)`
  margin-bottom: ${ rem(16) };

  ${ ColoredLongRoundButton } {
    
    &[aria-disabled="true"] {
      background-color: #BDBDBD;
    }
  }

  ${ breakpoint("tablet", `
    flex-basis: 35%;
    margin: 0 ${ fluid(16, 2, 24) } 0 0;
    max-width: ${ rem(352) };
  `) }

  ${ breakpoint("desktop", `

    ${ ColoredLongRoundButton } {

      &[aria-disabled="true"] {
        
        &:hover {
          cursor: not-allowed;
        }
      }
    }
  `) }
`