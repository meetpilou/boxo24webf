import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'

import Logger from '../core/logger.js'
import SwiperGL from '../vendors/swiper-gl.esm.js'

import '../../styles/swiper-gl.scss'

class SwiperImages {
  constructor(speed = 2000) {
    this.element = document.querySelector('.swiper-cover-images')
    this.logger = new Logger('SwiperImages')
    this.swiper = null
    this.speed = speed
  }

  /* PUBLIC METHODS */

  init() {
    this.logger.log('init')
    this._createSwiper()
  }

  /* PRIVATE METHODS */

  _createSwiper() {
    this.logger.log('_createSwiper')
    this.swiper = new Swiper(this.element, {
      init: false,
      centeredSlides: true,
      slidesPerView: 1,
      // draggable: false,
      // simulateTouch: false,
      autoplay: {
        delay: 5000,
      },
      loop: true,
      speed: this.speed,
      pagination: false,
      modules: [Autoplay, SwiperGL],
      effect: 'gl',
      gl: {
        shader: 'morph-x',
      },
    })
    this.swiper.init()
    this.swiper.autoplay.start()
  }
}

export default SwiperImages
