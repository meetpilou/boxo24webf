import App from './scripts/app.js'
import './styles/style.scss'

const mount = () => {
  const app = new App()
  window.app = app
  app.logger.log(Webflow)
  app.init()
}

window.addEventListener('DOMContentLoaded', mount)
