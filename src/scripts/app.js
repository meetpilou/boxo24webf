import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { TextPlugin } from 'gsap/TextPlugin'

import Menu from './components/menu.js'
import Core from './core.js'
import About from './pages/about.js'
import Facilities from './pages/facilities.js'
import Home from './pages/home.js'
import Movies from './pages/movies.js'
import NewsSlug from './pages/news-slug.js'
import News from './pages/news.js'
import Translations from './translations.js'
import Logger from './utils/logger.js'

gsap.registerPlugin(ScrollTrigger, SplitText, CSSPlugin, TextPlugin)

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

    this.page = null
    this.component = null

    this.core = new Core({ version: '1.0.0' })
    this.menu = new Menu('[data-navigation]')
    this.translations = new Translations()
    this.logger = new Logger('App')
  }

  /* GETTERS */

  /* PUBLIC METHODS  */

  init() {
    this.core.init()
    this.menu.init()
    this._setPageAndComponent()
  }

  /* PRIVATE METHODS */

  _setPageAndComponent() {
    const pageName = document.body.dataset.page

    this.page = pageName
    this.component = new this.pages[pageName]()
    this.component.init()

    this.logger.log('App initialized')
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
