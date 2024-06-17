import Page from '../classes/page.js'
import AnimatedMovies from '../components/animated-movies'
import SwiperCover from '../components/swiper-cover'
import SwiperImages from '../components/swiper-images'

class Home extends Page {
  constructor() {
    super('home')
    this.swiperCover = null
    this.swiperImages = null
    this.animatedMovies = null
  }

  /* PUBLIC METHODS */

  init() {
    this._createSliders()
    this._createAnimatedMovies()
  }

  /* PRIVATE METHODS */

  _createSliders() {
    this.logger.log('_createSlider')
    this.swiperCover = new SwiperCover({
      speed: 1000,
      delay: 6000,
      animationDelay: 1000,
    })
    this.swiperCover.init()
    this.swiperImages = new SwiperImages({ speed: 2000, delay: 5000 })
    this.swiperImages.init()
  }

  _createAnimatedMovies() {
    this.logger.log('_createAnimatedMovies')
    this.animatedMovies = new AnimatedMovies({
      selector: '[data-animated-movies]',
      target: '[data-animated-movies-target]',
    })
    this.animatedMovies.init()
  }

  _onResize() {
    this.swiperCover.update()
    this.swiperImages.update()
    this.animatedMovies.update()
  }

  _destroySwipers() {
    this.swiperCover.destroy()
    this.swiperImages.destroy()
  }
}

export default Home
