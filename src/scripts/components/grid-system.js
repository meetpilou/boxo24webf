import Logger from '../utils/logger'

class GridSystem {
  constructor(element) {
    this.element = element
    this.logger = new Logger('GridSystem')

    this._isVisible = false
  }

  /* GETTERS */

  get isVisible() {
    return this._isVisible
  }

  set isVisible(value) {
    this._isVisible = value
    this._onVisibilityChange()
  }

  /* PUBLIC METHODS */

  init() {
    this.logger.log('GridSystem initialized')
    this._setEvents()
    if (this.isVisible) {
      this.showGrid()
    }
  }

  showGrid() {
    this.element.style.visibility = 'visible'
    this.element.style.display = 'block'
  }

  hideGrid() {
    this.element.style.visibility = 'hidden'
    this.element.style.display = 'none'
  }

  /* PRIVATE METHODS */

  _setEvents() {
    window.addEventListener('keyup', (e) => this._handleKeyup(e), false)
  }

  _onVisibilityChange() {
    if (this.isVisible) {
      this.showGrid()
    } else {
      this.hideGrid()
    }
  }

  _handleKeyup(e) {
    // Hit CTRL + L on your page to show the grid in the website
    if (e.keyCode === 76 && e.ctrlKey) {
      this.isVisible = !this.isVisible
    }
  }
}

export default GridSystem
