import { gsap } from 'gsap'

import TimeDisplay from './time-display.js'
import { getDefaultTimeline } from '../utils/gsap.js'
import Logger from '../utils/logger.js'

class Menu {
  constructor(selector) {
    this.time = null
    this.logger = new Logger('Menu')
    this.isOpened = false
    this.timelineOpen = null
    this.timelineClose = null
    this.startPos = '105%'

    this.DOM = {
      element: document.querySelector(selector),
      addresses: [],
      items: [],
      menu: null,
      socials: null,
      texts: null,
      time: null,
      trigger: null,
      triggerText: null,
    }
  }

  /* PUBLIC METHODS */

  init() {
    this._getDom()
    this._initDom()
    /* Time */
    this.time = new TimeDisplay('[data-nav-time]')
    this.time.init()
    /* Trigger */
    this._setEvents()
    this._createTimelines()
  }

  /* PRIVATE METHODS */

  _createTimelines() {
    this._createTimelineClose()
    this._createTimelineOpen()
  }

  _createTimelineClose() {
    this.timelineClose = getDefaultTimeline({ pause: true })
      .to(
        this.DOM.menu,
        {
          duration: 1,
          width: '0',
          // height: '0',
          minWidth: '0rem',
          ease: 'power2.in',
        },
        0
      )
      .to(
        this.DOM.texts,
        {
          duration: 0.5,
          autoAlpha: 1,
          ease: 'power2.in',
        },
        0.4
      )
      .to(this.DOM.triggerText, { text: app.translations.current['menu'] }, 0.5)
      .to(
        this.DOM.items,
        { opacity: 0, y: -10, stagger: 0.1, duration: 0.5, ease: 'power3.in' },
        0
      )
      .to(
        this.DOM.addresses,
        { opacity: 0, x: -5, stagger: 0.1, duration: 0.5, ease: 'power3.in' },
        0
      )
      .to(
        this.DOM.socials,
        { opacity: 0, x: 5, stagger: 0.1, duration: 0.5, ease: 'power3.in' },
        0
      )
  }

  _createTimelineOpen() {
    this.timelineOpen = getDefaultTimeline({ pause: true })
      .to(
        this.DOM.menu,
        {
          duration: 1,
          width: '25vw',
          minWidth: '26.25rem',
          // height: 'auto',
          ease: 'power2.out',
        },
        0
      )

      .to(
        this.DOM.texts,
        { duration: 0.5, autoAlpha: 0, ease: 'power3.out' },
        0
      )
      .to(
        this.DOM.triggerText,
        { text: app.translations.current['close'] },
        0.5
      )
      .from(
        this.DOM.items,
        { opacity: 0, y: -20, stagger: 0.2, duration: 1, ease: 'power2.out' },
        0.2
      )
      .from(
        this.DOM.addresses,
        { opacity: 0, x: -5, stagger: 0.2, duration: 1, ease: 'power3.out' },
        1
      )
      .from(
        this.DOM.socials,
        { opacity: 0, x: 5, stagger: 0.15, duration: 0.5, ease: 'power3.out' },
        1.2
      )
  }

  _getDom() {
    this.DOM.addresses = this.DOM.element.querySelectorAll('[data-nav-address]')
    this.DOM.items = this.DOM.element.querySelectorAll('[data-nav-item]')
    this.DOM.menu = this.DOM.element.querySelector('[data-nav-menu]')
    this.DOM.socials = this.DOM.element.querySelectorAll('[data-nav-socials]')
    this.DOM.texts = this.DOM.element.querySelectorAll('[data-nav-texts]')
    this.DOM.trigger = this.DOM.element.querySelector('[data-nav-trigger]')
    this.DOM.triggerText = this.DOM.element.querySelector(
      '[data-nav-trigger] .button-nav_text'
    )
  }

  _initDom() {
    gsap.set(this.DOM.menu, {
      css: {
        display: 'block',
        width: '0',
        // height: '0',
        minWidth: '0rem',
      },
    })
  }

  _setEvents() {
    this.DOM.trigger.addEventListener('click', () => {
      this.isOpened = !this.isOpened
      this._update()
    })
  }

  _update() {
    if (this.isOpened) {
      this.timelineOpen.seek(0).play()
    } else {
      this.timelineClose.seek(0).play()
    }
  }
}

export default Menu
