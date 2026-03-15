const Router = require('../framework/Router.js')
const router = new Router()
const db = require('../db.js')
router.get('/group', (req,res)=>{
  const idGroup=req.query.id
  db.get(`
  select json_object('groupId',groupId, 'groupTitle', groupTitle, 'users', json(users)) as 'response' from (select groups.id as 'groupId', groups.title as 'groupTitle', json_group_array(
  json_object(
    'userId', logins.id,
    'username', logins.username
  )
) as users from usersGroups
left join groups on groups.id=usersGroups.groupId
left join logins on logins.id=usersGroups.userId
where usersGroups.groupId=? and exists(select 1 from usersGroups where usersGroups.userId=?)
group by usersGroups.groupId);`,[idGroup, req.user],(err,row)=>{
    if (err||!row) {
      res.writeHead(404)
      res.end()
    } else {
      res.end(row.response)
    }
  })
})
router.post('/group', (req, res) => {
  const serverId = crypto.randomUUID()
  let body = req.body
  const givenGroup = body;
  db.run('INSERT INTO groups (id,title) VALUES (?,?);', [serverId, givenGroup['titlePostList']], err => {
    if (err) { console.error(err.message); res.end(err.message) } else { console.log('it is ok'); /*res.end(JSON.stringify({ 'log': 'succes', serverId: serverId }))*/ }
  })
  db.run('insert into usersGroups (userId,groupId) values(?,?)',[req.user,serverId],err => {
    if (err) { console.error(err.message); res.end(err.message) } else { console.log('it is ok'); /*res.end(JSON.stringify({ 'log': 'succes', serverId: serverId }))*/ }
  })
  res.end(JSON.stringify({'log': 'succes', AnswerId: serverId, AnswerResult: "Group was writen to API" }))
})
router.delete('/group', (req,res) => {
  const idDel = req.query.id
  db.run('DELETE FROM groups WHERE id = ? and exists(select 1 from usersGroups where usersGroups.groupId=groups.id and usersGroups.userId=?);',[idDel,req.user] , err=>{
    if (err) { console.error(err.message); res.end(err.message) } else { console.log('it is ok'); res.end(JSON.stringify({ 'log': 'succes' })) }
  })
})
router.put('/group', (req,res)=>{
  const idEdit=req.body.group_id
  const nameEdit=req.body.group_title
  db.run('UPDATE groups SET (title)=(?) WHERE groups.id = ? and exists(select 1 from usersGroups where usersGroups.groupId=groups.id and usersGroups.userId=?)',[nameEdit, idEdit, req.user], err=>{
    if (err) { console.error(err.message); res.end(err.message) } else { console.log('it is ok'); res.end(JSON.stringify({ 'log': 'succes'})) }
  })
})

module.exports = router