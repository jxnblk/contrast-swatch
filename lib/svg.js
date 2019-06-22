const { createElement: h } = require('react')
const { renderToString } = require('react-dom/server')
const parseURL = require('./parse-url')
const parseColors = require('./colors')

const round = n => Math.floor(100 * n) / 100

module.exports = req => {
  const data = parseURL(req)
  if (!data) return null
  const colors = parseColors(data)

  const opts = Object.assign({
    width: 128,
    height: 96,
    fontSize: 16,
    // todo
    contrast: true,
    label: false,
  }, data.query)

  const { width, height } = opts
  const ratio = height / width
  const xheight = 32 * ratio
  const fontSize = opts.fontSize * ratio * .5
  const baseline = 16 * ratio + (opts.fontSize / 8 * ratio)

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
    viewBox: `0 0 32 ${xheight}`,
    fill: colors.hex.foreground,
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontWeight: 'bold',
      fontSize,
    },
  },
    h('rect', {
      width: 32,
      height: xheight,
      fill: colors.hex.background,
    }),
    h('text', {
      textAnchor: 'middle',
      x: 16,
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
