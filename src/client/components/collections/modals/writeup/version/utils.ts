import { WriteupPhases } from "@/src/server/models/writeup.model";


export const readonlyPhases: readonly WriteupPhases[] = ["writeup", "revision", "finalEdit", "graphics", "finalization"] as const

export const versionIndex = ( phase: WriteupPhases | "" ) =>{
  const phaseIndex = readonlyPhases.findIndex( curPhase => curPhase===phase )

  return phaseIndex
}

export const capitalizePhase = ( phase: WriteupPhases | "" ) => {
  return phase
    .split(/(?=[A-Z])/)
    .map(word => 
        word
          .charAt(0)
          .toUpperCase() + word.slice(1))
    .join(" ")
}