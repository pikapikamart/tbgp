import styled from "styled-components"
import { rem } from "@/styled/functions"
import { motion } from "framer-motion"


export const ChatboxWrapper = styled(motion.div)`
  border-radius: ${ rem(8) } ${ rem(8) } 0 0;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .10);
  height: 100vh;
  inset: auto ${ rem(64) } 0 auto;
  max-width: ${ rem(320) };
  max-height: ${ rem(432) };
  position: absolute;
  width: 100vw;

  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.white1 };
    border: 1px solid ${ colors.grey4 };
  ` }
`