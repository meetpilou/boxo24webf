import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import Swiper from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'

import {
  getDefaultTimeline,
  getTweenSlideUp,
  getTweenTitleText,
} from '../core/gsap-utils.js'
import Logger from '../core/logger.js'

class SwiperCover {
  constructor(speed = 2000) {
    this.element = document.querySelector('.swiper-cover')
    this.logger = new Logger('SwiperCover')
    this.activeSlide = null
    this.oldSlide = null
    this.speed = speed
    this.swiper = null
    this.slides = []
  }

  /* PUBLIC METHODS */

  init() {
    this.logger.log('init')
    this._createSwiper()
    this._setSwiperEvents()
  }

  /* PRIVATE METHODS */

  _createSwiper() {
    this.logger.log('_createSwiper')
    this.swiper = new Swiper(this.element, {
      init: false,
      centeredSlides: true,
      slidesPerView: 1,
      draggable: false,
      simulateTouch: false,
      autoplay: {
        delay: 5000,
      },
      loop: true,
      speed: this.speed,
      pagination: false,
      modules: [Autoplay, EffectFade],
      effect: 'fade',
      fadeEffect: { crossFade: true },
    })
    this.swiper.init()
  }

  _setSwiperEvents() {
    this.swiper.on('slideNextTransitionStart', () => {
      this.logger.log('slideNextTransitionStart')
      this._animate('next')
    })
    this.swiper.on('slidePrevTransitionStart', () => {
      this.logger.log('slidePrevTransitionStart')
      this._animate('prev')
    })
  }

  // ANIMATE

  _animate(direction = 'next') {
    this.logger.log('_animate', direction)
    this._animateActiveSlide()
    // this._animateOldSlide(direction)
  }

  _animateActiveSlide() {
    const activeSlide = this.element.querySelector('.swiper-slide-active')
    const DOM = this._getDOM(activeSlide)
    const split = this._createSplitTitle(DOM.title)
    const timeline = this._createTimeline(DOM, split, {
      delay: 1.5,
      onComplete: () => {
        // split.revert()
        this._clearDOM(DOM)
      },
    })
    timeline.play()
  }

  _animateOldSlide(direction = 'next') {
    const oldSlide =
      direction === 'next'
        ? this.element.querySelector('.swiper-slide-prev')
        : this.element.querySelector('.swiper-slide-next')

    const DOM = this._getDOM(oldSlide)
    const split = this._createSplitTitle(DOM.title)
    const timeline = this._createTimeline(DOM, split, {
      delay: 0,
      onReverseComplete: () => {
        split.revert()
        this._clearDOM(DOM)
      },
    })
    timeline.reverse(0)
  }

  _createTimeline(DOM, split, args = {}) {
    const timeline = getDefaultTimeline(args)
      .from(...getTweenTitleText(split), 0)
      .from(...getTweenSlideUp(DOM.info), 0.3)
      .from(...getTweenSlideUp(DOM.creator), 0.3)
      .from(...getTweenSlideUp(DOM.producer), 0.4)
      .from(...getTweenSlideUp(DOM.badges), 0.4)
      .from(...getTweenSlideUp(DOM.categories), 0.5)
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

  _clearDOM(DOM) {
    Object.keys(DOM).forEach((key) => {
      gsap.set(DOM[key], {
        clearProps: 'all',
      })
    })
  }

  _inverseSplit(split) {
    return [].slice.call(split.chars).reverse()
  }
}

export default SwiperCover
