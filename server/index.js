// all the source code is in a single module
// because who the fuck even knows how zeit now is supposed to work

const qs = require('querystring')
const url = require('url')
const Color = require('color')
const { createElement: h } = require('react')
const { renderToString } = require('react-dom/server')
const staticHandler = require('serve-handler')

const parseURL = (req) => {
  const data = url.parse(req.url)
  const [ , a, b ] = data.pathname.split('/')
  const query = qs.parse(data.query)
  const foreground = decodeURIComponent(a)
  const background = decodeURIComponent(b)

  if (!b || !a) return null

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
    // todo
    contrast: true,
    label: false,
  }, data.query)

  const width = opts.size || opts.width
  const height = opts.size || opts.height
  const xwidth = 32 * (width / height)
  const fontSize = opts.fontSize * 8
  const baseline = 16 + (fontSize / 3.125)

  let text = []
  if (opts.contrast) {
    text.push(round(colors.contrast))
  }
  if (opts.label) {
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
      fontWeight: 'bold',
      fontSize,
    },
  },
    h('rect', {
      width: xwidth,
      height: 32,
      fill: colors.hex.background,
    }),
    h('text', {
      textAnchor: 'middle',
      x: xwidth / 2,
      y: baseline,
    },
      text.join(' ')
    )
  )

  const svg = renderToString(el)

  return {
    ...data,
    colors,
    svg,
  }
}

module.exports = async (req, res) => {
  staticHandler(req, res, {
    public: 'public',
  })
  switch (req.url) {
    case '/favicon.ico':
      return 'favicon'
  }

  const data = svg(req)

  if (!data) {
    res.statusCode = 404
    return
  }

  switch (data.query.type) {
    case 'json':
      return data
  }

  res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  // res.setHeader('Cache-Control', 'public, max-age=86400')
  res.setHeader('Cache-Control', 'public, max-age=60')
  return data.svg
}