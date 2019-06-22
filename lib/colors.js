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

const getLabel = contrast => {
  if (contrast >= 7) return 'AAA'
  if (contrast >= 4.5) return 'AA'
  if (contrast >= 3) return 'lg'
  return 'Fail'
}

module.exports = (data) => {
  const foreground = getColor(data.foreground)
  const background = getColor(data.background)
  const contrast = foreground.contrast(background)
  const label = getLabel(contrast)

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
    label,
  }
}
