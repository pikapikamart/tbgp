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
  padding: ${ rem(12) };
  text-align: center;
`

export const DarkBlueButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.darkBlue};
`

export const DarkLongRoundButton = styled(DarkBlueButton)`
  border-radius: ${ rem(24) };
  min-width: ${ fluid(140, 10, 256) };
`

// --------Texts--------
export const DefaultText = styled.p`
  color: ${({ theme }) => theme.colors.dark1};
  font-size: ${ fluid(14, 1, 16) };
`

// --------Login & Registration--------

export const LoginImage = styled.img`
  margin: 0 auto ${ fluid(18, 3.5, 24) };
`

export const LoginBannerHeading = styled.p`
  font-weight: 500;
  line-height: 1;
  margin-bottom: ${ rem(12) };

  ${({ theme: { colors, fontSizes } }) => `
    color: ${ colors.dark1 };
    font-size: ${ fluid(fontSizes.welcomeHeading_m, 5, fontSizes.welcomeHeading_d) };
  `}
`

export const LoginBannerText = styled.p`
  font-size: ${ fluid(14, 2, 15) };

  ${({ theme }) => `
    color: ${ theme.colors.dark3 };
  `}
`

export const LoginForm = styled.form`
  margin-top: ${ rem(32) };
  padding: 0 ${ rem(8) };
`

export const LoginFieldWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: ${ rem(8) };
  }
`

export const LoginControlsContainer = styled.div`
  margin-top: ${ rem(24) };
`

export const LoginControlWrapper = styled.div`
  ${ DarkBlueButton } {
    width: 100%; 
  }
`

export const LoginTextInput = styled.input`
  border-radius: ${ rem(4) };
  font-size: ${ fluid(14, 2, 15) };
  padding: ${ rem(12) } 0 ${ rem(12) } ${ rem(10) };
  width: 100%;

  ${({ theme: { colors } }) => `
    border: 1px solid ${ colors.grey3 };
    background-color: ${ colors.white2 };
    color: ${ colors.dark2 };

    &[aria-invalid="true"] {
      border-color: ${ colors.red };
    }
  `}
`

export const LoginInputError = styled.span`
  display: none;
  margin: ${ rem(4) } 0 0 ${ rem(10) };
  text-align: left;

  ${({ theme }) => `
    color: ${ theme.colors.red };
    font-size: ${ rem(13) };
  `}

  &.show {
    display: block;
  }
`

// 