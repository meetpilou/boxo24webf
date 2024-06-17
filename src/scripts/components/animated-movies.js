import { gsap } from 'gsap'

import Component from '../classes/component'
import { clearAllProps, killTimeline } from '../utils/gsap'

class AnimatedMovies extends Component {
  constructor({ selector, target }) {
    super({ name: 'AnimatedMovies', selector })
    this.timelines = {
      main: null,
      columns: null,
    }

    this.DOM = {
      target: document.querySelector(target),
      columns: [],
      movies: [],
    }
  }

  /* PUBLIC METHODS */

  init() {
    super.init()

    this._getDom()
    this.create()
  }

  create() {
    super.create()

    this._setColumnsPositions()
    this._createMainTimeline()
    this._createColumnsTimeline()
  }

  update() {
    super.update()

    this.destroy()
    this.create()
  }

  destroy() {
    super.destroy()

    clearAllProps({ element: this.element, ...this.DOM })
    killTimeline(this.timelineMain)
    killTimeline(this.timelineColumns)
  }

  /* PRIVATE METHODS */

  _calculateCoordinates() {
    const elementRect = this.element.getBoundingClientRect()
    const targetRect = this.DOM.target.getBoundingClientRect()

    return {
      width: targetRect.width,
      height: targetRect.height,
      x: targetRect.left - elementRect.left,
      y: targetRect.top - elementRect.top,
    }
  }

  _createColumnsTimeline() {
    this.timelineColumns = gsap
      .timeline({
        scrollTrigger: {
          trigger: this.element,
          endTrigger: this.DOM.target,
          start: '-30% bottom',
          end: '80% bottom',
          scrub: 1,
          // markers: true,
        },
      })
      .to(this.DOM.columns[0], { y: '-35%', duration: 1, ease: 'power1.in' }, 0)
      .to(this.DOM.columns[1], { y: '-25%', duration: 1, ease: 'power1.in' }, 0)
      .to(this.DOM.columns[2], { y: '-42%', duration: 1, ease: 'power1.in' }, 0)
      .to(this.DOM.columns[3], { y: '-35%', duration: 1, ease: 'power1.in' }, 0)
  }

  _createMainTimeline() {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const coords = this._calculateCoordinates()
      this.timelines.main = gsap
        .timeline({
          scrollTrigger: {
            trigger: this.DOM.target,
            start: '20% bottom',
            end: '80% bottom',
            scrub: 1.5,
            // markers: true,
          },
        })
        .to(
          this.element,
          {
            y: coords.y,
            duration: 3,
            skewX: '0deg',
            skewY: '4deg',
            ease: 'power1.in',
          },
          0
        )
        .to(
          this.element,
          {
            width: coords.width,
            height: coords.height,
            skewX: '0deg',
            skewY: '0deg',
            x: coords.x,
            duration: 1,
            ease: 'power1.in',
          },
          3
        )
    })
  }

  _getDom() {
    this.DOM.columns = Array.from(
      this.element.querySelectorAll('[data-movies-grid-column]')
    )
    this.DOM.movies = Array.from(
      this.element.querySelectorAll('.movies-grid_item')
    )
  }

  _setColumnsPositions() {
    gsap.set(this.DOM.columns[0], { y: '-15%' })
    gsap.set(this.DOM.columns[1], { y: '-50%' })
    gsap.set(this.DOM.columns[2], { y: '-16%' })
    gsap.set(this.DOM.columns[3], { y: '-5%' })
  }
}

export default AnimatedMovies
