import styled from "styled-components"
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions"
import { RowCenterBetween } from "@/styled/shared/helpers"


export const BoardWrapper = styled(RowCenterBetween)`
  border-radius: ${ rem(4) };
  height: ${ rem(64) };
  margin-bottom: ${ rem(24) };
  padding: 0 ${ rem(16) };
  position: relative;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white2 };
    border: 1px solid ${ colors.grey3 };
  ` }

  ${ breakpoint("tablet", `
    background-color: transparent;
    height: ${ rem(96) };
    padding: 0;
  `) } 

  ${ breakpoint("desktop", `
    display: block;
    height: revert;
    margin-right: ${ rem(24) };
    margin-bottom: 0;
    max-width: ${ rem(240) };
    padding-bottom: ${ rem(64) };
    position: sticky;
    top: ${ rem(12) };
  `) }
`

export const BoardOwner = styled.div`

  ${ ({ theme: { colors } }) => `

    ${ breakpoint("tablet", `
      background-color: ${ colors.white2 };
      border-right: 1px solid ${ colors.grey3 };
      border-radius: ${ rem(4) };
      height: 100%;
      padding: ${ rem(20) } 0 0 ${ rem(24) };
      width: ${ rem(192) };
    `) }

    ${ breakpoint("desktop", `
      border-right: none;
      border-bottom: 1px solid ${ colors.grey3 };
      height: revert;
      margin-bottom: ${ rem(24) };
      padding: ${ rem(24) } 0 ${ rem(24) } ${ rem(24) };
      width: revert;
    `) }
  ` }
`

export const BoardDecor = styled.img`
  display: none;

  ${ breakpoint("tablet", `
    display: block;
    margin-bottom: ${ fluid(8, 1.2, 16) };
  `) }
`

export const BoardOwnerName = styled.p`
  font-weight: 600;
  font-size: ${ rem(15) };

  > span {
    display: block;
    font-size: ${ rem(13) };
    margin-top: ${ rem(2) };
  }

  ${ ({ theme: { colors } }) => `
    color: ${ colors.dark2 };

    > span {
      color: ${ colors.dark3 };
      font-weight: 500;
    }
  ` }
`

export const BoardInfoList = styled.ul`
  display: none;
  left: 0;

  ${ breakpoint("tablet", `
    display: flex;
    flex-basis: calc(100% - ${ rem(192) });
    justify-content: center;
  `) }

  ${ breakpoint("desktop", `
    display: block;
    padding-left: ${ rem(24) };
  `) }
`

export const BoardInfoItem = styled.li`
  color: ${ ({ theme }) => theme.colors.dark3 };
  font-size: ${ rem(14) };
  font-weight: 500;
  padding-left: ${ rem(14) };
  position: relative;

  &::before {
    content: "";
    border-radius: 50%;
    height: ${ rem(6) };
    inset: 50% auto auto 0;
    position: absolute;
    transform: translate(0, -50%);
    width: ${ rem(6) };
  }

  &:first-of-type::before {
    background-color: ${ ({ theme }) => theme.colors.orange };
  }

  &:nth-of-type(2)::before {
    background-color: ${ ({ theme }) => theme.colors.blue };
  }

  &:not(:last-of-type) {
    margin-bottom: ${ rem(6) };
  }
  
  > span {
    font-weight: 600;
  }

  ${ breakpoint("tablet", `
    &:not(:last-of-type) {
      margin-right: ${ rem(16) };
      margin-bottom: 0;
    }
  `) }

  ${ breakpoint("desktop", `
    &:not(:last-of-type) {
      margin-right: 0;
      margin-bottom: ${ rem(12) };
    }
  `) } 
`

export const BoardMenu = styled.button`
  background: url("/icons/icon-v-dropdown.svg") no-repeat center center;
  border-radius: 50%;
  height: ${ rem(36) };
  width: ${ rem(36) };

  &[aria-expanded="true"] {
    transform: rotateX(-190deg);

    + ${ BoardInfoList } {
      background-color: ${ ({ theme }) => theme.colors.white2 };
      border-radius: ${ rem(4) };
      border: 1px solid ${ ({ theme }) => theme.colors.grey2 };
      display: block;
      padding: ${ rem(12) } ${ rem(16) };
      position: absolute;
      top: calc(100% + ${ rem(2) });
      width: 100%;
      z-index: 10;
    }
  }

  ${ breakpoint("tablet", `
    display: none;
  `) }
`