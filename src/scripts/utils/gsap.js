import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { merge } from 'lodash'

// ANIMATIONS UTILS

const clearAllProps = (DOM) => {
  Object.keys(DOM).forEach((key) => {
    gsap.set(DOM[key], {
      clearProps: 'all',
    })
  })
}

const killTimeline = (timeline) => {
  if (timeline) {
    timeline.kill()
    timeline.clear()
  }
}

const getDefaultTimeline = (args) => {
  const options = merge(
    { defaults: { ease: 'power2.out' }, delay: 0, paused: true },
    args
  )
  return gsap.timeline(options)
}

const getSplitText = (selector, type = 'words chars') => {
  return new SplitText(selector, {
    type: type,
    wordClass: 'overflow-hidden',
  })
}

const getTweenTitleText = (split, args) => {
  const effect = {
    autoAlpha: 0,
    duration: 1,
    ease: 'power3.out',
    perspective: 500,
    // rotationX: -130,
    stagger: 0.01,
    y: 15,
  }

  return [split.chars, merge(effect, args)]
}

const getTweenScrambleText = (selector, args) => {
  const effect = {
    // duration: 0.5,
    ease: 'power2.out',
    scrambleText: {
      text: '{original}',
      chars: 'upperCase',
      speed: 1,
      tweenLength: true,
    },
  }
  return [selector, merge(effect, args)]
}

const getTweenSlideUp = (selector, args) => {
  const effect = {
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    y: 20,
  }

  return [selector, merge(effect, args)]
}

const getTweenText = (selector, args) => {
  const effect = {
    text: 'default',
    ease: 'none',
  }
  return [selector, merge(effect, args)]
}

const getTweenFade = (selector, args) => {
  const effect = {
    opacity: 0,
    duration: 1,
    ease: 'none',
  }
  return [selector, merge(effect, args)]
}

export {
  clearAllProps,
  killTimeline,
  getDefaultTimeline,
  getTweenScrambleText,
  getTweenSlideUp,
  getTweenText,
  getTweenFade,
  getTweenTitleText,
  getSplitText,
}
