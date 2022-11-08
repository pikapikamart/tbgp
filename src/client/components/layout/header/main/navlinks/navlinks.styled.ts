import { rem } from "@/styled/functions"
import styled from "styled-components"


export const NavlinksList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${ rem(24) };
  padding-top: ${ rem(32) };
`

export const NavlinksListItem = styled.li`
  color: ${ ({ theme }) => theme.colors.dark1 };
  font-family: "Friz Quadrata Std Medium";
  margin: 0 0 ${ rem(32) } ${ rem(40) };
`