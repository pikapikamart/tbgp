import { 
  breakpoint, 
  rem } from "@/styled/functions"
import styled from "styled-components"
import { motion } from "framer-motion"


export const ChatsWrapper = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  inset: auto 0 0 auto;
  position: fixed;
  width: 100%;
  z-index: 1000;

  ${ breakpoint("tablet", `
    inset: auto ${ rem(24) } 0 auto;
  `) }

  ${ breakpoint("desktop", `
    inset: auto ${ rem(96) } 0 auto;
  `) }
`

export const ChatsTrigger = styled(motion.button)`
  background: url("/icons/icon-chat.svg") no-repeat center center;
  background-color: ${ ({ theme }) => theme.colors.darkBlue };
  border-radius: 50%;
  height: ${ rem(48) };
  margin-bottom: ${ rem(16) };
  margin-right: ${ rem(16) };
  width: ${ rem(48) };

  ${ breakpoint("tablet", `
    margin-right: 0;
  `) }
`

export const UnseenChats = styled(motion.p)`
  border-radius: 50%;
  display: grid;  
  font-size: ${ rem(10) };
  font-weight: 500;
  height: ${ rem(18) };
  inset: 0 0 auto auto;
  line-height: 1;
  margin-right: ${ rem(16) };
  place-content: center;
  position: absolute;
  width: ${ rem(18) };
  z-index: 50;

  ${ breakpoint("tablet", `
    margin-right: 0;
  `) }
  
  ${ ({ theme: { colors } }) => `
    background-color: ${ colors.red };
    color: ${ colors.white1 };
  ` }
`