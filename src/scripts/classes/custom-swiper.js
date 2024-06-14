import { gsap } from 'gsap'

import Logger from '../utils/logger.js'

class CustomSwiper {
  constructor({
    name = 'CustomSwiper',
    selector = '.swiper',
    delay = 5000,
    speed = 2000,
    animationDelay = 2000,
  }) {
    this.element = document.querySelector(selector)
    this.logger = new Logger(name)
    this.speed = speed
    this.delay = delay
    this.animationDelay = animationDelay
    this.swiper = null
  }

  /* PUBLIC METHODS */

  init() {
    this.logger.log('init')
    this.create()
  }

  create() {
    this.logger.log('create')
  }

  update() {
    this.logger.log('update')
    this.destroy()
    this.create()
  }

  destroy() {
    this.logger.log('destroy')
    this.swiper?.destroy(true, true)
  }

  /* PRIVATE METHODS */

  _clearDOM(DOM) {
    Object.keys(DOM).forEach((key) => {
      gsap.set(DOM[key], {
        clearProps: 'all',
      })
    })
  }
}

export default CustomSwiper
