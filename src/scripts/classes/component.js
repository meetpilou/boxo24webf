import Logger from '../utils/logger'

class Component {
  constructor({ name = 'Component', selector = '' }) {
    this.name = name
    this.element = this._createElement(selector)
    this.logger = new Logger(this.name)
  }

  /* GETTERS */

  getName() {
    return this.name
  }

  /* PUBLIC METHODS */

  init() {
    this.logger.log('init')
  }

  create() {
    this.logger.log('create')
  }

  update() {
    this.logger.log('update')
  }

  destroy() {
    this.logger.log('destroy')
  }

  /* PRIVATE METHODS */

  _createElement(selector) {
    const els = Array.from(document.querySelectorAll(selector))
    if (els.length === 0) {
      this.logger.error('Element not found')
      return null
    } else if (els.length === 1) {
      return els[0]
    } else {
      return els
    }
  }
}

export default Component
