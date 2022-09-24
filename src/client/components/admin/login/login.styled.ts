import styled from "styled-components";
import { rem } from "@/styled/functions";


export const MainWrapper = styled.main`
  padding: ${ rem(64) } ${ rem(14) };
`

export const ContentContainer = styled.div`
  max-width: ${ rem(400) };
  margin: 0 auto;
  text-align: center;
`