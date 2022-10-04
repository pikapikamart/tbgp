import { 
  fluid, 
  rem } from "@/styled/functions";
import { DarkLongRoundButton } from "@/styled/shared/collection";
import { ColumCenterCenter, RowCenterCenter } from "@/styled/shared/helpers";
import styled from "styled-components";


export const BaseModalWrapper = styled(RowCenterCenter)`
  background-color: rgba(0, 0, 0, .8);
  inset: 0;
  outline: none;
  position: fixed;
`

export const ModalExit = styled.div`
  inset: 0;
  position: absolute;
`

export const ConfirmationModal = styled.div`
  border-radius: ${ rem(8) };
  max-width: ${ fluid(330, 70, 528) };
  padding: ${ fluid(48, 8, 64) } ${ rem(32) } ${ fluid(40, 7, 56) };
  position: relative;
  text-align: center;
  z-index: 10;
  width: 100vw;

  ${({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    color: ${ colors.dark2 };
  `}
`

export const ConfirmationDescription = styled.p`
  font-size: ${ fluid(15, 1.4, 17) };
  margin: ${ rem(24) } 0 ${ rem(32) };

  > span {
    font-weight: 600;
  }
`

export const ConfirmationHeading = styled.h3`
  font-size: ${ fluid(20, 4, 30) };
`

// --------Verification--------

type VerificationChoiceButtonProps = {
  accepted: boolean
}

export const VerificationChoiceButton = styled(DarkLongRoundButton)<VerificationChoiceButtonProps>`
  background-color: ${({ accepted, theme }) => accepted? theme.colors.blue : theme.colors.red };
  margin-bottom: ${ rem(8) };
`

export const VerificationCloseButton = styled(DarkLongRoundButton)`

  ${({ theme: { colors } }) => `
    background-color: ${ colors.white3 };
    border: 1px solid ${ colors.grey4 };
    color: ${ colors.dark2 };
  `}
`