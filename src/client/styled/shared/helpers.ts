import styled, { css } from "styled-components";
import { rem } from "../functions"
import { motion } from "framer-motion"


export const SrOnly = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

export const CenterContent = styled.div`
  margin: 0 auto;
  max-width: max-content;
`

const BaseRowCenter = css`
  align-items: center;
  display: flex;
`

export const RowCenterBetween = styled(motion.div)`
  ${ BaseRowCenter };

  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`

export const RowCenter = styled.div`
  ${ BaseRowCenter };
`

export const RowEnd = styled.div`
  align-items: flex-end;
  display: flex;
`

export const RowCenterCenter = styled(motion.div)`
  ${ BaseRowCenter };
  
  justify-content: center;
`

export const RowStartCenter = styled(RowCenterCenter)`
  align-items: flex-start;
`

export const ColumCenterCenter = styled.div`
  ${ BaseRowCenter };

  flex-direction: column;
  justify-content: center;
`

export const BlockLink = styled.a`
  display: block;
`

type MarginLeftProps = {
  pause?: boolean
}

export const MarginLeft = styled.div<MarginLeftProps>`
  max-width: max-content;
  margin-left: ${ ({ pause }) => pause? `${ rem(8) }` : "auto" };
`