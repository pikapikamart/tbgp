import styled from "styled-components";
import { 
  rem,
  fluid, 
  breakpoint} from "../functions";
import { 
  RowCenter, 
  RowCenterCenter } from "./helpers";


// --------Buttons--------

const BaseButton = styled.button`
  border-radius: ${ rem(4) };
  color: ${({ theme }) => theme.colors.white1};
  font-size: ${ fluid(14, 2, 15) };
  font-weight: 500;
  padding: ${ rem(12) };
  text-align: center;
`

export const SmallBaseButton = styled(BaseButton)`
  padding: ${ fluid(6, 1.3, 8) } ${ rem(12) };
`

export const DarkBlueButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.darkBlue};
`

export const DarkLongRoundButton = styled(DarkBlueButton)`
  border-radius: ${ rem(24) };
  min-width: ${ fluid(140, 19, 256) };
`

// --------Texts--------
export const DefaultText = styled.p`
  color: ${({ theme }) => theme.colors.dark2};
  font-size: ${ fluid(14, 2, 16) };
`