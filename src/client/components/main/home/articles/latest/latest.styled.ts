import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { InitArticleMainHeading } from "@/styled/shared/article/initial";


export const LatestArticlesWrapper = styled.div`
  margin-bottom: ${ fluid(64, 12, 80) };
  padding: 0 ${ fluid(16, 2, 24) };

  ${ breakpoint("desktop",`
    margin-bottom: ${ rem(64) }; 
  `) }
`

export const LatestContentContainer = styled.div`
  max-width: ${ rem(1264) };
  margin: 0 auto;
`

export const SectionHeaderContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: ${ fluid(24, 3, 32) };
  width: 100%;
  
  ${ InitArticleMainHeading } {
    margin-bottom: 0;
  }
`

export const SeeAll = styled.a`
  font-size: ${ fluid(14, 2, 18) };
  font-weight: 600;
  padding-left: ${ rem(16) };

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    color: ${ colors.dark2 };
  ` }
`

export const ArticlesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${ rem(280) }, 1fr));
  gap: ${ rem(32) } ${ fluid(24, 2, 32) };
  overflow: hidden;

  ${ breakpoint("desktop", `
    grid-template-columns: repeat(3, 1fr);
  `) }
`