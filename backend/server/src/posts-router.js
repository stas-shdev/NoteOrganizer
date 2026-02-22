const Router=require('../framework/Router');
const router=new Router();
const db=require("../db.js")

router.post('/posts', (req, res) => {
  const body = req.body
  console.log(req.body)
  const serverId = crypto.randomUUID()
  const givenPost = body;
  db.run('INSERT INTO posts (id,title,paragraph,group_id) VALUES (?,?,?,?);', [serverId, givenPost['title'], givenPost['body'], givenPost['group']], err => {
    if (err) { console.error(err.message); res.end(err.message) } else { console.log('it is ok'); }
  })
  res.end(JSON.stringify({ status: 'succes', serverId: serverId }))
})

router.delete('/posts', (req, res) => {
  const idDel = req.query.id
  console.log(idDel)
  db.run('DELETE FROM posts WHERE id = ?;', idDel, function (err) {
    if (err) { console.error(err.message); res.end(err.message) } else { console.log('it is ok'); res.end(`post[${idDel}] was removed`) }
  })
})
router.get('/posts', (req, res) => {
  db.get(`select json_group_array(json(readyJSONobject)) as 'readyJSON' from (select json_object(
	'group_id',groups.id,
	'group_title',groups.title,
	'posts', json_group_array(
		json_object(
			'id', posts.id,
			'title',posts.title,
			'body', posts.paragraph
			)
		)
	) as readyJSONobject from groups
left join posts on groups.id= posts.group_id
group by groups.id);`, [], (err, row) => {
    if (err) { console.error(err) } else { res.end(row.readyJSON) }
  })
})

router.put('/posts', (req, res) => {
  const changedPostId=req.body.id;
  const newName=req.body.title;
  const newParagraph = req.body.body;
  db.run("UPDATE posts SET (title,paragraph)=(?,?) WHERE posts.id=?;",[newName,newParagraph,changedPostId],(err)=>{
    if (err) { console.error(err.message); res.end(err.message) } else { console.log('it is ok'); res.end(`post[${changedPostId}] was changed`) }
  })
})


module.exports=router