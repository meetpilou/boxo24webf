class Logger {
  constructor(name) {
    this.name = name ?? 'Logger'
  }

  log(message) {
    console.log(`[${this.name}] =>`, message)
  }
}

export default Logger
