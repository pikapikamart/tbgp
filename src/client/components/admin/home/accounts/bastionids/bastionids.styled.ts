import styled, { keyframes } from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";


export const BastionIdsWrapper = styled.ul`
  margin: ${ fluid(16, 2, 18) } 0 ${ rem(40) };
`

export const BastionIdListOption = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  border-radius: ${ rem(4) };
  font-size: ${ fluid(15, 1.5, 16) };
  font-weight: 600;
  position: relative;
  
  &:not(:last-of-type) {
    margin-bottom: ${ fluid(8, 1, 14) };
  }
`

export const BastionIdListButton = styled.button`
  padding: ${ rem(14) } ${ rem(16) };
  padding-left: ${ fluid(16, 3, 32) };
  text-align: left;
  width: 100%;
`

const BastionIdButtonCopiedAnim = keyframes`
  0%, 100% {
    opacity: 0;
  }
  25%, 70% {
    opacity: 1;
  }
`

export const BastionIdButtonCopied = styled.p`
  animation: ${ BastionIdButtonCopiedAnim } .75s ease forwards;
  display: grid;
  height: 100%;
  inset: 0 auto auto 0;
  place-content: center;
  position: absolute;
  width: 100%;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.greenBlue };
    color: ${ colors.white1 };
  ` }
`