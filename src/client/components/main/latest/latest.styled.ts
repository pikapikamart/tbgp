import styled from "styled-components"
import { 
  fluid,
  breakpoint } from "@/styled/functions"
import { InitArticleMainHeading } from "@/styled/shared/article/initial"


export const LatestWrapper = styled.div`
  margin: ${ fluid(56, 6, 64) } 0 ${ fluid(64, 8, 96) };
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