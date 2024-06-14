class Translations {
  constructor() {
    this.en = {
      menu: 'Menu',
      close: 'Close',
    }
    this.fr = {
      menu: 'Menu',
      close: 'Fermer',
    }
  }

  get current() {
    const lang = document.documentElement.lang
    switch (lang) {
      case 'fr':
        return this.fr
      case 'en':
        return this.en
      default:
        return this.en
    }
  }
}

export default Translations
