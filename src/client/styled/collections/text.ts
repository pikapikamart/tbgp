import styled from "styled-components";
import { 
  rem,
  fluid, 
  breakpoint} from "../functions";


// --------Texts--------
export const DefaultText = styled.p`
  color: ${({ theme }) => theme.colors.dark2};
  font-size: ${ fluid(14, 2, 16) };
`

// ----Platform----
export const HeadingLarge = styled.h1`
  color: ${ ({ theme }) => theme.colors.dark1 };
  font-size: ${ fluid(20, 5, 32) };
`