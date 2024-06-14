import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Logger from './utils/logger'

class Core {
  constructor({ version }) {
    this.breakpoints = null
    this.environment = null
    this.gsap = null
    this.lenis = null
    this.version = version
    this.language = 'en'
    this.logger = new Logger('App')
  }

  /* PUBLIC METHODS */

  init() {
    this._createBreakpoints()
    this._createEnvironment()
    this._createLenis()
    this._createGsap()
    this._getLanguage()

    this.logger.log('Core initialized')
  }

  /* PRIVATE METHODS */

  _createBreakpoints() {
    this.breakpoints = {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
    }
  }

  _createEnvironment() {
    this.environment =
      Webflow && Webflow.env('editor')
        ? 'editor'
        : Webflow && Webflow.env('design')
        ? 'designer'
        : 'production'
  }

  _createLenis() {
    this.lenis = new Lenis({
      duration: 1.1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -13 * t)),
    })
    this.lenis.on('scroll', ScrollTrigger.update)
  }

  _createGsap() {
    if (this.isProduction) {
      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }
  }

  _getLanguage() {
    this.language = document.documentElement.lang || 'en'
  }

  /* GETTERS */

  get isEditor() {
    return this.environment === 'editor'
  }

  get isDesigner() {
    return this.environment === 'designer'
  }

  get isProduction() {
    return this.environment === 'production'
  }

  get isMobile() {
    return innerWidth < this.breakpoints.mobile
  }

  get isMobileLandscape() {
    return innerWidth < this.breakpoints.tablet
  }

  get isTablet() {
    return innerWidth < this.breakpoints.desktop
  }

  get isDesktop() {
    return innerWidth > this.breakpoints.desktop
  }
}

export default Core
