import Page from '../classes/page.js'
import SwiperCover from '../components/swiper-cover.js'
import SwiperImages from '../components/swiper-images.js'

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

    this.swiperCover = new SwiperCover({ speed: 2000, delay: 7000 })
    this.swiperCover.init()

    this.swiperImages = new SwiperImages({ speed: 5000, delay: 4000 })
    this.swiperImages.init()
  }
}

export default Home
