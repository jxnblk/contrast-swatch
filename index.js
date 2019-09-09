const Color = require('color')
const { createElement: h } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const homepage = 'https://github.com/jxnblk/contrast-swatch'

const parseURL = (req) => {
  const { foreground, background, ...query } = req.query

  if (!foreground || !background) return null

  return {
    foreground,
    background,
    query,
  }
}

const HEX = /^[A-Fa-f0-9]{3,6}$/

const getColor = (raw) => {
  if (HEX.test(raw)) raw = '#' + raw
  try {
    return Color(raw)
  } catch (e) {
    return null
  }
}

const getLabel = contrast => {
  if (contrast >= 7) return 'AAA'
  if (contrast >= 4.5) return 'AA'
  if (contrast >= 3) return 'lg'
  return 'Fail'
}

const parseColors = (data) => {
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

const round = n => Math.floor(100 * n) / 100

const svg = req => {
  const data = parseURL(req)
  if (!data) return null
  const colors = parseColors(data)

  const opts = Object.assign({
    width: 128,
    height: 128,
    font: 'system-ui,sans-serif',
    fontSize: 1,
    fontWeight: 700,
    baseline: 0,
    label: false,
    radius: 0,
  }, data.query)

  const width = Number(opts.size || opts.width)
  const height = Number(opts.size || opts.height)
  const xwidth = 32 * (width / height)
  const fontSize = Number(opts.fontSize) * 8

  let text = [ round(colors.contrast) ]
  if (Boolean(opts.label)) {
    text.push(colors.label)
  }
  if (opts.text) text = [opts.text]

  const el = h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width,
    height,
    viewBox: `0 0 ${xwidth} 32`,
    fill: colors.hex.foreground,
    style: {
      fontFamily: opts.font,
      fontWeight: opts.fontWeight,
      fontSize,
    },
  },
    h('rect', {
      width: xwidth,
      height: 32,
      fill: colors.hex.background,
      rx: opts.radius,
    }),
    h('text', {
      textAnchor: 'middle',
      x: xwidth / 2,
      y: 16 + Number(opts.baseline),
      dominantBaseline: 'middle',
    },
      text.join(' ')
    )
  )

  const svg = renderToStaticMarkup(el)

  return {
    ...data,
    colors,
    svg,
  }
}

module.exports = async (req, res) => {
  const data = svg(req)

  if (!data) return

  switch (data.query.type) {
    case 'json':
      return res.send(data)
  }

  res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  res.send(data.svg)
}
