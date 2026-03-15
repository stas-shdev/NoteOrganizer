const Router = require("../framework/Router.js")
const router= new Router()
const db=require('../db.js')

router.delete("/usersGroups",(req,res)=>{
  const AuthUserId=req.user
  const userId=req.query.userId
  const groupId=req.query.groupId
  db.run("DELETE FROM usersGroups WHERE exists(select 1 from usersGroups where usersGroups.userId=? and usersGroups.groupId=?) and usersGroups.userId=? and usersGroups.groupId=?",[AuthUserId,groupId,userId,groupId],(err)=>{
    if (err) {
      console.log
      res.send({status:'succes'})
    } else {
      res.send({status:'succes'})
    }
  })
})

module.exports = router