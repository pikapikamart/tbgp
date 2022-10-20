import styled from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"
import { ColoredBaseButton } from "@/styled/collections/button"


export const RequestsWrapper = styled.div`
  flex-basis: 100%;
  margin-top: ${ rem(8) };
`

export const CreateRequestButton = styled(ColoredBaseButton)`
  border-radius: 50%;
  height: ${ rem(48) };
  inset: auto ${ rem(32) } ${ rem(32) } auto;
  padding: 0;
  position: fixed;
  width: ${ rem(48) };  

  img {

    &:first-of-type {
      display: none;
    }

    &:last-of-type {
      inset: 50% auto auto 50%;
      position: absolute;
      transform: translate(-50%, -50%);
    }
  }

  span {
    opacity: 0;
    position: absolute;
  }

  ${ breakpoint("tablet", `
    align-items: center;
    border-radius: ${ rem(4) };
    display: flex;  
    flex: 1 0 ${ rem(141) };
    height: revert;
    margin-left: ${ rem(16) };
    position: static;
    padding: ${ rem(12) };
    width: revert;

    img {

      &:first-of-type {
        display: block;
      }
  
      &:last-of-type {
        display: none;
      }

      margin-right: ${ rem(6) };
    }

    span {
      opacity: 1;
      position: static;
    }
  `) }
`

export const StoryRequestsContentContainer = styled.div`
  margin-top: ${ fluid(24, 4.5, 32) };
`