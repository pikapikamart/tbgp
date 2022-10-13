import styled from "styled-components"
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions"
import { 
  DefaultText, 
  SmallBaseButton } from "@/styled/shared/collection"


export const VerificationsListWrapper = styled.ul`
  outline: none;
`

export const VerificationItem = styled.li`
  border-radius: ${ rem(4) };
  border: 1px solid ${({ theme }) => theme.colors.grey3};
  display: grid;
  gap: 0 ${ rem(8) };
  grid-template-columns: 1fr min-content;
  grid-template-rows: repeat(2, auto);
  padding: ${ rem(12) };

  &:not(:last-of-type) {
    margin-bottom: ${ rem(12) };
  }

  ${ breakpoint("tablet", `
    align-items: center;
    grid-template-columns: 1fr repeat(2, min-content);
  `) } 

  ${ breakpoint("desktop", `
    grid-template-columns: repeat(2, auto) repeat(2, min-content);
    grid-template-rows: auto;
    padding: ${ rem(12) } ${ rem(24) };
  `) }
`

export const VerificationRequester = styled(DefaultText)`
  align-self: flex-end;
  font-weight: 700;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  line-height: 1;

  ${ breakpoint("desktop", `
    align-self: unset;
  `) }
`

export const VerificationRole = styled.p`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.dark2};
  font-size: ${ fluid(13, 1, 14) };
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  > span {
    background-color: ${({ theme }) => theme.colors.green};
    border-radius: ${ rem(24) };
    color: #FFFFFF;
    display: inline-block;
    font-weight: 500;
    margin: ${ rem(4) } ${ rem(8) } 0;
    padding: ${ rem(4) } ${ rem(8) };
  }

  ${ breakpoint("desktop", `
    grid-column: 2 / 3;
    grid-row: 1 / 2 ;
  `) }
`

type VerificationOptionProps = {
  bgColor: "blue" | "red";
}

export const VerificationOption = styled(SmallBaseButton)<VerificationOptionProps>`
  background-color: ${({ theme, bgColor }) => bgColor==="red"? theme.colors.red : theme.colors.blue};
  font-size: ${ fluid(13, 1.8, 14) };

  &:first-of-type {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-bottom: ${ rem(4) };
  }

  &:last-of-type {
    align-self: flex-start;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  ${ breakpoint("tablet", `
    
    &:first-of-type {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
      margin-bottom: 0;
    }

    &:last-of-type {
      align-self: unset;
      grid-column: 3 / 4;
      grid-row: 1 / 3;
    }
  `) }

  ${ breakpoint("desktop", `

    &:first-of-type {
      grid-column: 3 / 4;
      grid-row: 1 / 3;
      margin-bottom: 0;
    }

    &:last-of-type {
      align-self: unset;
      grid-column: 4 / 5;
      grid-row: 1 / 3;
    }
  `) }
`