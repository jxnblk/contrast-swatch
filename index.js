const parse = require('./lib/parse-url')
const svg = require('./lib/svg')

module.exports = async (req, res) => {
  switch (req.url) {
    case '/favicon.ico':
      return null
  }

  const data = svg(req)
  if (!data) {
    res.statusCode = 404
    return 'Not found'
  }

  switch (data.query.type) {
    case 'json':
      return data
  }

  res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  return data.svg
}
