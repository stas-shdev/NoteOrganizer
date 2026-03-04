module.exports = (req, res, next) => {
  const cookies = req.headers.cookie
  if (cookies) {
    req.cookie = Object.fromEntries(cookies.split("; ").map(elem => {
      const [key, value] = elem.split("=")
      return [key, value]
    }))
  }
  next()
}