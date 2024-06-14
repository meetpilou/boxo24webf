class Logger {
  constructor(name) {
    this.name = name ?? 'Logger'
  }

  /* PUBLIC METHODS */

  log(message) {
    console.log(`[${this.name}] =>`, message)
  }
}

export default Logger
