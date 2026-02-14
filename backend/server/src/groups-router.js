const Router = require('../framework/Router.js')
const router = new Router()
const db = require('../db.js')

router.post('/api/group', (req, res) => {
  const serverId = crypto.randomUUID()
  let body = req.body
  const givenGroup = body;
  db.run('INSERT INTO groups (id,title) VALUES (?,?);', [serverId, givenGroup['titlePostList']], err => {
    if (err) { console.error(err.message); res.end(err.message) } else { console.log('it is ok'); res.end(JSON.stringify({ 'log': 'succes', serverId: serverId })) }
  })
  res.end(JSON.stringify({ AnswerId: serverId, AnswerResult: "Group was writen to API" }))
})

module.exports = router