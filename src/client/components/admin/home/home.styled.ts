import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";


export const MainWrapper = styled.main`
  padding: ${ rem(32) } ${ fluid(24, 4, 48) };
`

export const MainContentContainer = styled.div`
  
  ${ breakpoint("tablet", `
    display: flex;
    justify-content: center;
  `) }  
`

export const HomeFrameWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: ${ rem(4) };
  padding: ${ rem(16) } ${ rem(8) };

  ${({ theme }) => `
    color: ${ theme.colors.dark2 };
  `}

  ${ breakpoint("desktop", `
    padding: ${ rem(16) };
  `) }
`

export const HomeFrameHeading = styled.h2`
  font-size: ${ fluid(18, 2.6, 24) };
  font-weight: 600;
  margin-bottom: ${ fluid(4, .7, 8) };
`