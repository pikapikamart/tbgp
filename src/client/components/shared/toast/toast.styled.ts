import styled, { 
  css,
  keyframes } from "styled-components"
import { rem } from "@/styled/functions"


type ToastWrapperProps = {
  colored: "red"
}

const toastAnimation = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translate(100%, 0);
  }

  30%, 80% {
    opacity: 1;
    transform: translate(0, 0);
  }
`

export const ToastWrapper = styled.div<ToastWrapperProps>`
  animation: ${ toastAnimation } 4s ease forwards;
  border-radius: ${ rem(4) };
  color: ${ ({ theme }) => theme.colors.white1 };
  inset: 0 0 auto auto;
  max-width: ${ rem(288) };
  padding: ${ rem(16) } ${ rem(24) };
  position: fixed;
  text-align: left;
  z-index: 100;

  ${ ({ theme: { colors }, colored }) => {
    switch(colored) {
      case "red":
        return css`background-color: ${ colors.red };`
    }
  } }
`

export const ToastStatus = styled.h4`
  font-size: ${ rem(18) };
  font-weight: 600;
  margin-bottom: ${ rem(4) };
`

export const ToastMessage = styled.p`
  font-size: ${ rem(14) };
  font-weight: 500;
`