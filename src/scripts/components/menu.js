import { gsap } from 'gsap'

import TimeDisplay from './time-display.js'
import { getDefaultTimeline } from '../utils/gsap.js'
import Logger from '../utils/logger.js'

class Menu {
  constructor() {
    this.element = document.querySelector('[data-nav-bar]')
    this.time = null
    this.logger = new Logger('Menu')
    this.isOpened = false
    this.timelineOpen = null
    this.timelineClose = null
    this.startPos = '105%'
    this.DOM = {
      trigger: null,
      time: null,
      socials: null,
      items: [],
      addresses: [],
    }
  }

  /* PUBLIC METHODS */

  init() {
    this._getDom(this.element)
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
  }

  _createTimelineOpen() {
    this.timelineOpen = getDefaultTimeline({ pause: true })
      .to(
        this.DOM.menu,
        {
          duration: 1,
          width: '25vw',
          minWidth: '26.25rem',
          ease: 'power2.out',
        },
        0
      )
      .to(
        this.DOM.texts,
        {
          duration: 0.5,
          autoAlpha: 0,
          ease: 'power2.out',
        },
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
        { opacity: 0, x: -5, stagger: 0.2, duration: 1, ease: 'power2.out' },
        1
      )
      .from(
        this.DOM.socials,
        { opacity: 0, x: 5, stagger: 0.15, duration: 0.5, ease: 'power2.out' },
        1.2
      )
  }

  _getDom(parent) {
    this.DOM = {
      trigger: parent.querySelector('[data-nav-trigger]'),
      triggerText: parent.querySelector('[data-nav-trigger] .button-nav_text'),
      menu: parent.querySelector('[data-nav-menu]'),
      texts: parent.querySelector('[data-nav-texts]'),
      socials: parent.querySelector('[data-nav-socials]'),
      items: parent.querySelectorAll('[data-nav-item]'),
      addresses: parent.querySelectorAll('[data-nav-address]'),
    }
  }

  _initDom() {
    gsap.set(this.DOM.menu, {
      // css: { display: 'flex', transform: `translateX(${this.startPos})` },
      css: {
        display: 'flex',
        width: '0',
        minWidth: '0rem',
        // overflow: 'hidden',
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
