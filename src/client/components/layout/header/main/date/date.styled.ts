import { 
  breakpoint, 
  fluid,
  rem } from "@/styled/functions";
import styled from "styled-components";


export const DateWrapper = styled.div`
  margin-left: ${ fluid(8, 1.2, 16) };

  ${ breakpoint("desktop", `
    margin-left: revert;
    padding-left: ${ rem(24) };
    position: relative;

    &::before {
      background-color: black;
      border-radius: 50%;
      content: "";
      height: ${ rem(6) };
      inset: calc(50% - ${ rem(3) }) auto auto 0;
      position: absolute;
      width: ${ rem(6) };
    }
  `) }
`

export const DateDayLong = styled.p`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-family: "Friz Quadrata Std Bold";
  font-weight: 700;
  font-size: ${ fluid(14, 1.3, 16) };
  line-height: 1;
  text-align: right;
`

export const DateFull = styled.p`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-family: "Friz Quadrata Std Medium";
  font-size: ${ fluid(13, 1.2, 15) };
`