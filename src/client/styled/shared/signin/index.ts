import { InputBlock } from "@/components/collections/inputs/regular/input.styled";
import styled from "styled-components";
import { 
  rem,
  fluid } from "../../functions";


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

  ${ InputBlock } {

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

export const SigninControlsDivider = styled.div`
  position: relative;

  &::before {
    content: "";
    background-color: ${ ({ theme }) => theme.colors.grey3 };
    height: 1px;
    inset: 50% auto auto 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }

  > span {
    background-color: ${ ({ theme }) => theme.colors.white1 };
    color: ${ ({ theme }) => theme.colors.grey1 };
    font-size: ${ rem(15) };
    padding: 0 ${ rem(8) };
    position: relative  ;
    z-index: 5;
  }
`

export const SigninBlockControls = styled.div`
  width: 100%;

  > a {
    display: block;

    &:first-of-type {
      margin-bottom: ${ rem(8) };
    }
  }
`