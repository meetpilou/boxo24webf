import Component from '../classes/component'

class TimeDisplay extends Component {
  constructor(selector) {
    super({ name: 'TimeDisplay', selector })
    this.interval = null
  }

  init() {
    super.init()
    this.interval = setInterval(() => {
      this._updateTime()
    })
  }

  destroy() {
    super.destroy()
    clearInterval(this.interval)
    this.element.innerHTML = '00:00'
  }

  /* PRIVATE METHODS */

  _updateTime() {
    const now = this._formatTime(new Date())
    if (this.element) {
      this.element.innerHTML = now
    }
  }

  _formatTime(date) {
    const options = {
      timeZone: 'Europe/Brussels',
      hour: '2-digit',
      minute: '2-digit',
    }
    return date.toLocaleTimeString('en-GB', options)
  }
}

export default TimeDisplay
