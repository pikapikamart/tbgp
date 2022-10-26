import styled from "styled-components"
import {
  rem,
  fluid
} from "@/styled/functions"
import { ModalWrapper } from "@/styled/shared/modal"


export const StoryRequestWrapper = styled(ModalWrapper)`
  padding: 0;
  text-align: left;
`

export const RequestHeader = styled.div`
  border-radius: ${ rem(8) } ${ rem(8) };
  padding: ${ rem(32) } ${ fluid(16, 3.5, 32) } ${ rem(24) };
  position: relative;

  // &::before {
  //   content: "";
  //   border-radius: ${ rem(8) } ${ rem(8) } 0 0;
  //   height: calc(100% + ${ rem(24) });
  //   inset: 0;
  //   position: absolute;

  //   ${ ({ theme: { colors } }) => `
  //   background-color: ${ colors.whiteBlue2 };
  //   border-bottom: 1px solid ${ colors.grey3 };
  // ` }
  // }
`

export const RequestHeaderContent = styled.div`
  position: relative;
  z-index: 10;
`

export const RequestOwner = styled.p`
  color: ${ ({ theme }) => theme.colors.dark2 };
  font-size: ${ rem(14) };
  margin-top: ${ rem(8) };

  > a {
    font-size: ${ rem(15) };
    text-decoration: underline;
  }
`

export const InnerContainer = styled.div`
  padding: 0 ${ fluid(16, 3.5, 32) } ${ rem(32) };
  position: relative;
  z-index: 5;
`

export const ContentContainer = styled.div`
  display: grid;
  gap: ${ rem(16) } 0;
  margin-top: ${ rem(16) };
  padding-bottom: ${ rem(24) };

  ${ ({ theme: { colors } }) => `
    border-bottom: 1px solid ${ colors.grey3 };
    color: ${ colors.dark2 };
  ` }
`

export const RowContentContainer = styled.div`
  line-height: 1.4;
  white-space: pre-wrap;

  &:first-of-type {
    align-item: center;
    display: flex;
  }
`

export const SubHeading = styled.h4`
  font-size: ${ fluid(13, 2, 14) };
`

export const RequestMembers = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

export const RequestMemberLink = styled.a`
  text-decoration: underline;
`

export const RequestNoteWrapper = styled.div`
  margin-top: ${ rem(16) };
`