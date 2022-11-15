import styled from "styled-components";
import { HeaderWrapper } from "@/styled/shared/header";


export const MainHeaderWrapper = styled(HeaderWrapper)`
  background-color: ${ ({ theme }) => theme.colors.white1 };  
  z-index: 50;
`