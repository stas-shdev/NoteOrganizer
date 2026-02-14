const { URL } = require('node:url')
module.exports = (req, baseAdress = 'http://localhost:5000/') => {
  const url = new URL(req.url, baseAdress)
  req.path = url.pathname.replace(/\/+$/g, "");
  req.params = {};
  req.query = Object.fromEntries(url.searchParams);
  console.log(req.query.id)
}