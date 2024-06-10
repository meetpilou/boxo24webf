import SwiperCover from '../components/swiper-cover.js'
import SwiperImages from '../components/swiper-images.js'
import Page from '../core/page.js'

class Home extends Page {
  constructor() {
    super('home')
    this.slider = null
  }

  /* PUBLIC METHODS */

  init() {
    this._createSliders()
  }

  /* PRIVATE METHODS */

  _createSliders() {
    this.logger.log('_createSlider')

    this.swiperCover = new SwiperCover()
    this.swiperCover.init()

    this.swiperImages = new SwiperImages()
    this.swiperImages.init()
  }
}

export default Home
