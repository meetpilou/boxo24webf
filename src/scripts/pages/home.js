import Page from '../classes/page.js'
import SwiperCover from '../components/swiper-cover.js'
import SwiperImages from '../components/swiper-images.js'

class Home extends Page {
  constructor() {
    super('home')
    this.swiperCover = null
    this.swiperImages = null
  }

  /* PUBLIC METHODS */

  init() {
    this._createSliders()
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

  _onResize() {
    this.swiperCover.update()
    this.swiperImages.update()
  }

  _destroySwipers() {
    this.swiperCover.destroy()
    this.swiperImages.destroy()
  }
}

export default Home
