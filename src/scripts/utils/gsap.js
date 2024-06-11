import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { merge } from 'lodash'

const callbackInViewport = ({
  trigger,
  once = true,
  start = 'top bottom',
  end = 'bottom bottom',
  onEnter = () => {},
  onLeave = () => {},
  onEnterBack = () => {},
  onLeaveBack = () => {},
}) => {
  ScrollTrigger.create({
    markers: false,
    once,
    trigger,
    start,
    end,
    onEnter,
    onEnterBack: () => {
      onEnterBack ? onEnterBack() : onEnter()
    },
    onLeave,
    onLeaveBack: () => {
      onLeaveBack ? onLeaveBack() : onLeave()
    },
  })
}

// ANIMATIONS UTILS
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

const getTweenSlideUp = (selector, args) => {
  const effect = {
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    y: 15,
  }

  return [selector, merge(effect, args)]
}

const getTweenSlideDown = (selector, args) => {
  const effect = {
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    y: 15,
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
  callbackInViewport,
  getDefaultTimeline,
  getTweenScrambleText,
  getTweenTitleText,
  getTweenSlideDown,
  getTweenSlideUp,
  getTweenFade,
  getSplitText,
}
