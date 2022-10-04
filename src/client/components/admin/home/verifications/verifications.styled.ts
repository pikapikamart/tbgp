import { TablistWrapper } from "@/components/shared/tablist/tablist.styled";
import { 
  breakpoint, 
  rem } from "@/styled/functions";
import styled from "styled-components";
import { HomeFrameWrapper } from "../home.styled";


export const VerificationsWrapper = styled(HomeFrameWrapper)`

  ${ breakpoint("tablet", `
    flex-basis: 65%;
  `) }

  ${ TablistWrapper } {
    margin-top: ${ rem(18) };
  }
`