

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

export const swipeupVariant = {
  initial: {
  },
  animate: {
    // y: ["4%", "-0%"],
    transition: {
      duration: .3
    }
  },
  exit: {}
}