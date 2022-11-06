import styled from "styled-components"
import { 
  breakpoint, 
  rem,
  fluid } from "@/styled/functions"
import { ModalFocusBack } from "@/components/shared/modal/modal.styled"


export const MainWrapper = styled.main``

export const MainContentContainer = styled(ModalFocusBack)`
  display: flex;
  flex-direction: column-reverse;  
  max-width: ${ rem(896) };
  margin: 0 auto;
  padding: 0 ${ rem(24) } 0;
  position: relative;

  ${ breakpoint("tablet", `
    display: block;
    padding-bottom: ${ fluid(64, 10, 80) };
  `) }
`