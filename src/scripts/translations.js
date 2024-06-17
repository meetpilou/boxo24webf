class Translations {
  constructor() {
    this.en = {
      menu: 'Menu',
      close: 'Close',
      view_our_projects: 'View our projects',
    }
    this.fr = {
      menu: 'Menu',
      close: 'Fermer',
      view_our_projects: 'Voir nos projets',
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
