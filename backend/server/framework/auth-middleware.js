const jwt=require('jsonwebtoken')
require('dotenv').config()
module.exports=(req,res,next)=>{
  try {
    const token=req.headers.authorization
    req.user = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)["userId"]
    next()
  } catch (err) {
    res.statusCode=401
    res.send(err)
  }
}