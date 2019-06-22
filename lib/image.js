const { PNG } = require('pngjs')
const Jimp = require('jimp')
const parseURL = require('./parse-url')
const parseColors = require('./colors')

const round = n => (Math.floor(100 * n) / 100)

module.exports = async (req) => {
  const data = parseURL(req)
  if (!data) return null
  const colors = parseColors(data)

  const {
    width = 128,
    height = 128,
  } = data.query

  // hoist
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)

  const image = await Jimp.read('./hello.png')
  image.resize(width, height)
  image.print(font, 0, 0, round(colors.contrast))
  // image.background(colors.hex.background)

  const buffer = await image.getBufferAsync('image/png')
  console.log(colors)

  return buffer
}
