import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

import { Breakpoints } from './core'
import About from './pages/about.js'
import Facilities from './pages/facilities.js'
import Home from './pages/home.js'
import Movies from './pages/movies.js'
import NewsSlug from './pages/news-slug.js'
import News from './pages/news.js'
import Logger from './utils/logger.js'

gsap.registerPlugin(ScrollTrigger, SplitText, CSSPlugin)

class App {
  constructor() {
    this.pages = {
      home: Home,
      facilities: Facilities,
      about: About,
      movies: Movies,
      news: News,
      newsSlug: NewsSlug,
    }
    // Config
    this.version = '1.0.0'
    this.environment = 'editor'
    this.logger = new Logger('App')
    this.breakpoints = new Breakpoints()

    this.page = null
    this.component = null
  }

  /* GETTERS */

  /* PUBLIC METHODS  */

  init() {
    this._setStates()
    this._setConfiguration()
  }

  /* PRIVATE METHODS */

  _setStates() {
    this.environment =
      window.Webflow && window.Webflow.env('editor')
        ? 'editor'
        : window.Webflow && window.Webflow.env('design')
        ? 'designer'
        : 'production'

    this.logger.log(`Environment: ${this.environment}`)
  }

  _setConfiguration() {
    const pageName = document.body.dataset.page

    this.page = pageName
    this.component = new this.pages[pageName]()
    this.component.init()

    if (this.environment === 'production') {
      this._setLenis()
      this._setGsap()
    }

    this.logger.log('App initialized')
  }

  _setLenis() {
    this.lenis = new Lenis({
      duration: 1.1,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -13 * t)),
    })
    this.lenis.on('scroll', ScrollTrigger.update)
  }

  _setGsap() {
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
  }

  _setPageTransition() {
    document.querySelectorAll('[data-lenis-start]').on('click', function () {
      this.config.lenis.start()
    })
    document.querySelectorAll('[data-lenis-stop]').on('click', function () {
      this.config.lenis.stop()
    })

    document.querySelectorAll('[data-lenis-toggle]').on('click', function () {
      this.toggleClass('stop-scroll')
      if (this.hasClass('stop-scroll')) {
        this.lenis.stop()
      } else {
        this.lenis.start()
      }
    })

    document.addEventListener('DOMContentLoaded', function () {
      var images = document.querySelectorAll('img')
      images.forEach(function (img) {
        img.addEventListener('dragstart', function (event) {
          event.preventDefault()
        })
      })
    })
  }
}

export default App
