const parse = require('./lib/parse-url')
const image = require('./lib/image')

module.exports = async (req, res) => {
  switch (req.url) {
    case '/favicon.ico':
      return null
  }

  const png = await image(req)
  if (!png) return 'todo'

  console.log(png)

  res.setHeader('Content-Type', 'image/png')
  return png
}
