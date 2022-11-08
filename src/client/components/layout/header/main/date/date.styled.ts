import { fluid } from "@/styled/functions";
import styled from "styled-components";


export const DateWrapper = styled.div`
  margin-left: ${ fluid(8, 1.2, 16) };
`

export const DateDayLong = styled.p`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-family: "Friz Quadrata Std Bold";
  font-weight: 700;
  font-size: ${ fluid(14, 1.3, 16) };
  text-align: right;
`

export const DateFull = styled.p`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-family: "Friz Quadrata Std Medium";
  font-size: ${ fluid(13, 1.2, 15) };
`