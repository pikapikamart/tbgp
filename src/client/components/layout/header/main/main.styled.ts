import styled, { keyframes } from "styled-components";
import { HeaderWrapper } from "@/styled/shared/header";
import { rem } from "@/styled/functions";


const scrollIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const scrollOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`

export const MainHeaderWrapper = styled(HeaderWrapper)`
  background-color: ${ ({ theme }) => theme.colors.white1 };  
  z-index: 50;

  &.scroll-in {
    animation: ${scrollIn} 1s ease forwards;
    box-shadow: 0 0 ${rem(16)} 0 rgba(0, 0, 0, .2);
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
  }
  
  &.scroll-out {
    animation: ${scrollOut} .45s ease forwards;
  }
`