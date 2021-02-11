const tinycolor = require('tinycolor2')

const primaryColor = tinycolor('hsl(173, 70%, 53%)')

export const COLORS = {
  background: {
    light: 'hsl(0, 100%, 99%)',
    dark: 'hsl(0, 0%, 5%)'
  },
  'background-contrast': {
    light: 'hsl(0, 0%, 95%)',
    dark: 'hsl(0, 0%, 10%)'
  },
  text: {
    light: 'hsl(0, 0%, 5%)',
    dark: 'hsl(0, 100%, 99%)'
  },
  heading: {
    light: 'hsl(157, 15%, 15%)',
    dark: 'hsl(157, 5%, 90%)'
  },
  primary: {
    light: primaryColor.toHslString(),
    dark: primaryColor.toHslString()
  },
  quote: {
    light: primaryColor
      .clone()
      .lighten(40)
      .toHslString(),
    dark: primaryColor
      .clone()
      .darken(45)
      .toHslString()
  },
  code: {
    light: 'hsl(0, 10%, 90%)',
    dark: 'hsla(0, 0%, 20%, 50%)'
  }
}

export const SOUND_MODE_KEY = 'sound-mode'
export const COLOR_MODE_KEY = 'color-mode'
export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode'
