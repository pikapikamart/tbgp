import styled from "styled-components"
import { 
  fluid, 
  rem } from "@/styled/functions"


export const SearchWrapper = styled.div`
  margin: ${ fluid(56, 6, 64) } auto ${ fluid(96, 10,  128) };
  max-width: ${ rem(848) };
  padding: ${ fluid(16, 3, 24) };
`

export const SearchHeader = styled.div`
  margin-bottom: ${ fluid(48, 6, 64) };
`

export const SearchMainHeading = styled.h1`
  align-items: flex-start;
  color: ${ ({ theme }) => theme.colors.dark2 };
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: ${ rem(15) };

  > span {
    font-size: ${ fluid(20,2, 24) };
    font-weight: 700;
    margin-top: ${ rem(8) };
  }
`

export const ArticleList = styled.ul``