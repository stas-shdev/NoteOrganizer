const Router = require('../framework/Router.js')
const router = new Router()
const { createToken, verifyToken } = require('../utilities/jwtToken.js')
const db = require('../db.js')
router.post("/createInviteLink", (req, res) => {
  db.get('SELECT groupId from usersGroups where userId=? AND groupId=?', [req.user, req.body.invitedGroupId], (err, row) => {
    if (row) {
      const invitedGroupId = row.groupId
      res.send({ createdLink: createToken({ groupId: invitedGroupId }, 300) })
    } else {
      res.statusCode(404)
      res.send({message: 404})
    }
  })
})
router.post("/joingroup", (req, res) => {
  try {
    const groupId = verifyToken(req.body.inviteToken).groupId
    db.run('INSERT INTO usersGroups (userId, groupId) VALUES (?,?)', [req.user, groupId])
    res.send("fine")
  } catch (err) {
    res.send(err)
  }
})
module.exports = router