const Color = require('color')

const HEX = /^[A-Fa-f0-9]{3,6}$/

const getColor = (raw, fallback = '#666') => {
  if (HEX.test(raw)) raw = '#' + raw
  try {
    return Color(raw)
  } catch (e) {
    return Color(fallback)
  }
}

module.exports = (data) => {
  const foreground = getColor(data.foreground)
  const background = getColor(data.background)
  const contrast = foreground.contrast(background)

  // console.log( 'hex',)

  return {
    foreground,
    background,
    raw: data,
    hex: {
      foreground: foreground.hex(),
      background: background.hex(),
    },
    rgb: {
      foreground: foreground.rgb().array(),
      background: background.rgb().array(),
    },
    contrast,
  }
}
