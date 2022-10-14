import { SigninInputBlock } from "@/components/collections/inputs/signin/input.styled";
import styled from "styled-components";
import { 
  rem,
  fluid, 
  breakpoint} from "../../functions";


export const SigninMainWrapper = styled.main`
  padding: ${ rem(64) } ${ rem(14) };
`

export const SigninContentContainer = styled.div`
  max-width: ${ rem(400) };
  margin: 0 auto;
  text-align: center;
`

export const SigninLogo = styled.img`
  margin: 0 auto ${ fluid(18, 3.5, 24) };
`

export const SigninHeading = styled.p`
  font-weight: 500;
  line-height: 1;
  margin-bottom: ${ rem(12) };

  ${({ theme: { colors, fontSizes } }) => `
    color: ${ colors.dark1 };
    font-size: ${ fluid(fontSizes.welcomeHeading_m, 5, fontSizes.welcomeHeading_d) };
  `}
`

export const SigninText = styled.p`
  font-size: ${ fluid(14, 2, 15) };

  ${({ theme }) => `
    color: ${ theme.colors.dark3 };
  `}
`

export const SigninForm = styled.form`
  margin-top: ${ rem(32) };
  padding: 0 ${ rem(8) };

  ${ SigninInputBlock } {

    &:not(:last-of-type) {
      margin-bottom: ${ rem(8) };
    }
  }
`

export const SigninControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  gap: ${ rem(32) } 0;
  margin-top: ${ rem(24) };
`