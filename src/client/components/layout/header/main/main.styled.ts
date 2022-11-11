import { HeaderWrapper } from "@/styled/shared/header";
import styled from "styled-components";


export const MainHeaderWrapper = styled(HeaderWrapper)`
  background-color: ${ ({ theme }) => theme.colors.white1 };  
  // position: sticky;
  // top: 0;
  z-index: 50;
`