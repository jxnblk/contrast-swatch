const qs = require('querystring')
const url = require('url')

module.exports = (req) => {
  const data = url.parse(req.url)
  const [ , a, b ] = data.path.split('/')
  const query = qs.parse(data.query)
  const foreground = decodeURIComponent(a)
  const background = decodeURIComponent(b)
  if (!foreground || !background) return null
  return {
    foreground,
    background,
    query,
  }
}
