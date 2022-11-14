

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

export const storyRequestRequestsVariant = {
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