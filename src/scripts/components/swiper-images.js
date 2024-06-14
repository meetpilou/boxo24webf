import Swiper from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'

import CustomSwiper from '../classes/custom-swiper.js'
import SwiperGL from '../vendors/swiper-gl.esm.js'

import '../../styles/swiper-gl.scss'

class SwiperImages extends CustomSwiper {
  constructor({ delay = 5000, speed = 2000 }) {
    super({
      name: 'SwiperImages',
      selector: '.swiper-cover-images',
      delay,
      speed,
    })
  }

  /* PUBLIC METHODS */

  create() {
    super.create()
    this.swiper = new Swiper(this.element, {
      init: false,
      centeredSlides: true,
      slidesPerView: 1,
      draggable: false,
      simulateTouch: false,
      autoplay: {
        delay: this.delay,
        disableOnInteraction: false,
      },
      loop: true,
      speed: this.speed,
      pagination: false,
      modules: [Autoplay, SwiperGL, EffectFade],
      effect: app.core.isDesktop ? 'gl' : 'fade',
      fadeEffect: app.core.isDesktop ? null : { crossFade: true },
      gl: {
        shader: 'morph-x',
      },
    })
    this.swiper.init()
  }
}

export default SwiperImages
