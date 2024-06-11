class Breakpoints {
  constructor() {
    this.mobile = 480
    this.tablet = 768
    this.desktop = 1024
  }

  /* GETTERS */

  get isMobile() {
    return window.innerWidth < this.breakpoints.mobile
  }

  get isMobileLandscape() {
    return window.innerWidth < this.breakpoints.tablet
  }

  get isTablet() {
    return window.innerWidth < this.breakpoints.desktop
  }

  get isDesktop() {
    return window.innerWidth > this.breakpoints.desktop
  }
}

export default Breakpoints
