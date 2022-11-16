

export const baseStaggerVariant = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}

export const simpleFadeVariant = {
  initial: {
    opacity:0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: .3
    }
  },
  exit: {
    opacity:0,
    transition: {
      duration: .3
    }
  }
}

export const fadeSwipeRightVariant = {
  initial: {
    opacity: 0,
    x: "-4%"
  },
  animate: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: .4
    }
  },
  exit: {
    opacity: 0,
    x: "-4%",
    duration: .4
  }
}

export const delayFadeSwipe = ( delay: number ) => ({
  ...fadeSwipeRightVariant,
  animate: {
    ...fadeSwipeRightVariant.animate,
    transition: {
      ...fadeSwipeRightVariant.animate.transition,
      delay
    }
  }
})

export const versionModalVariant = {
  initial: {
    x: "100%",
    transition: { 
      type: 'spring', 
      duration: .75 
    }
  },
  animate: {
    x: "0%",
    transition: { 
      type: 'spring', 
      duration: .75 
    }
  }
}