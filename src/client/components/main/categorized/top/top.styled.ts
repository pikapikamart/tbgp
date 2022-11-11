import styled from "styled-components";
import { 
  rem,
  fluid, 
  breakpoint,
  customBreakpoint} from "@/styled/functions";
import { InitArticleMainHeading } from "@/styled/shared/article/initial";


export const TopArticlesWrapper = styled.div`
  margin-top: ${ fluid(56, 6, 64) };
  padding: 0 ${ fluid(16, 5, 64) };

  ${ breakpoint("tablet", `

    ${ InitArticleMainHeading } {
      text-align: left;

      > span {
        padding-left: 0;
      }
    }
  `) }
`

export const TopArticlesList = styled.ul`
  display: grid;
  gap: ${ rem(32) } ${ fluid(24, 2, 32) };
  grid-template-columns: repeat(auto-fill, minmax(${ rem(260) }, 1fr));
  overflow: hidden;

  ${ breakpoint("tablet", `
    gap: ${ rem(24) } ${ rem(20) };
    grid-template-columns: repeat(2, 1fr);
  `) }

  ${ customBreakpoint(1100, `
    gap: ${ rem(32) };
    grid-template-columns: ${ fluid(540, 60, 785) } 1fr;
  `) }

  // ${ breakpoint("desktop",`
  //   gap: ${ rem(32) };
  //   grid-template-columns: ${ fluid(540, 60, 785) } 1fr;
  // `) }
`