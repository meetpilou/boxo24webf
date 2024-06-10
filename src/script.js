import App from './scripts/app.js'
import './styles/style.scss'

const mount = () => {
  const app = new App()
  app.init()
  app.logger.log(window.Webflow)
  window.app = app
}

window.addEventListener('DOMContentLoaded', mount)
