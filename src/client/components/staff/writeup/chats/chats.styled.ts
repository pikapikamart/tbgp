import { rem } from "@/styled/functions"
import styled from "styled-components"
import { motion } from "framer-motion"


export const ChatsWrapper = styled(motion.div)`
  inset: auto ${ rem(96) } 0 auto;
  position: fixed;
  z-index: 100;
`

export const ChatsTrigger = styled(motion.button)`
  background: url("/icons/icon-chat.svg") no-repeat center center;
  background-color: ${ ({ theme }) => theme.colors.darkBlue };
  border-radius: 50%;
  height: ${ rem(48) };
  margin-bottom: ${ rem(16) };
  width: ${ rem(48) };
`