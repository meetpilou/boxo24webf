import Logger from '../utils/logger.js'

class Page {
  /* CONSTRUCTOR */

  constructor(name) {
    this.name = name
    this.DOM = {}
    this.logger = new Logger(`Page ${this.name}`)
    this._setEventListeners()
  }

  /* PUBLIC METHODS */

  init() {}

  /* PRIVATE METHODS */

  _setEventListeners() {
    window.addEventListener('load', this._onLoad)
    window.addEventListener('DOMContentLoaded', this._onDOMContentLoaded)
    window.addEventListener('resize', this._onResize)
  }

  _onLoad() {}

  _onDOMContentLoaded() {}

  _onResize() {}
}

export default Page
