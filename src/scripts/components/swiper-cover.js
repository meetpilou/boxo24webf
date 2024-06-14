import { SplitText } from 'gsap/SplitText'
import Swiper from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'

import CustomSwiper from '../classes/custom-swiper.js'
import {
  getDefaultTimeline,
  getTweenSlideUp,
  getTweenTitleText,
} from '../utils/gsap.js'

class SwiperCover extends CustomSwiper {
  constructor({ delay = 5000, speed = 2000, animationDelay = 2000 }) {
    super({
      name: 'SwiperCover',
      selector: '.swiper-cover',
      delay,
      speed,
      animationDelay,
    })
    this.activeSlide = null
    this.oldSlide = null
  }

  /* PUBLIC METHODS */

  create() {
    super.create()
    this.logger.log('_createSwiper')
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
      modules: [Autoplay, EffectFade],
      effect: 'fade',
      fadeEffect: { crossFade: true },
    })
    this.swiper.init()
    this.swiper.on('slideNextTransitionStart', () => {
      this.logger.log('slideNextTransitionStart')
      this._animate('next')
    })
    this.swiper.on('slidePrevTransitionStart', () => {
      this.logger.log('slidePrevTransitionStart')
      this._animate('prev')
    })
  }

  update() {
    const activeSlide = this.element.querySelector('.swiper-slide-active')
    const DOM = this._getDOM(activeSlide)
    this._clearDOM(DOM)
    super.update()
  }

  /* PRIVATE METHODS */

  _animate(direction = 'next') {
    this.logger.log('_animate', direction)
    this._animateActiveSlide()
  }

  _animateActiveSlide() {
    const activeSlide = this.element.querySelector('.swiper-slide-active')
    const DOM = this._getDOM(activeSlide)
    const split = this._createSplitTitle(DOM.title)
    const timeline = this._createTimeline(DOM, split, {
      delay: this.animationDelay / 1000,
      onComplete: () => {
        this._clearDOM(DOM)
      },
    })
    timeline.play()
  }

  _createTimeline(DOM, split, args = {}) {
    const timeline = getDefaultTimeline(args)
      .from(...getTweenTitleText(split, { duration: 1.5 }), 0)
      .from(...getTweenSlideUp(DOM.info, { duration: 1.5 }), 0.3)
      .from(...getTweenSlideUp(DOM.creator, { duration: 1.5 }), 0.3)
      .from(...getTweenSlideUp(DOM.producer, { duration: 1.5 }), 0.4)
      .from(...getTweenSlideUp(DOM.badges, { duration: 1.5 }), 0.4)
      .from(...getTweenSlideUp(DOM.categories, { duration: 1.5 }), 0.5)
    return timeline
  }

  _createSplitTitle(title) {
    return new SplitText(title, {
      type: 'line words chars',
      wordClass: 'overflow-hidden',
    })
  }

  _getDOM(slide) {
    return {
      title: slide.querySelector('[data-slide-title]'),
      info: slide.querySelector('[data-slide-info]'),
      creator: slide.querySelector('[data-slide-creator]'),
      producer: slide.querySelector('[data-slide-producer]'),
      badges: slide.querySelector('[data-slide-badges]'),
      categories: slide.querySelector('[data-slide-categories]'),
    }
  }

  _inverseSplit(split) {
    return [].slice.call(split.chars).reverse()
  }
}

export default SwiperCover
