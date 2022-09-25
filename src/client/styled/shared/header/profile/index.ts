import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { RowCenter } from "@/styled/shared/helpers";
import { DropdownWrapper } from "../dropdown";


export const ProfileContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey3};
  margin-bottom: ${ rem(16) };
  padding-bottom: ${ fluid(16, 3, 24) };
`

export const ProfileName = styled.p`
  font-size: ${ fluid(14, 1.2, 15) };
  font-weight: 600;
  margin-bottom: ${ rem(2) };

  ${({ theme: { colors } }) => `
    color: ${ colors.dark2 };

    + p {
      color: ${ colors.dark3 };
      font-size: ${ fluid(12, 1, 13) };
    }
  `}

  ${ breakpoint('tablet', `
    margin-bottom: 0;
  `) }
`

export const ProfileMenu = styled.button`
  background: url("/icons/dots.svg") no-repeat center center;
  border-radius: ${ rem(4) };
  height: ${ rem(40) };
  width: ${ rem(40) };
`

export const ProfileWrapper = styled(RowCenter)`
  display: none;

  ${ breakpoint("tablet", `
    display: flex;

    ${ ProfileContainer } {
      border-bottom: none;
      margin: 0 ${ rem(8) } 0 0;
      padding-bottom: 0;
    }

    &.toggled + ${ DropdownWrapper } {
      opacity: 1;
      visibility: visible;
    }
  `) }
`