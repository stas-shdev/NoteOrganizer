const jwt=require('jsonwebtoken')
const createToken = (body, expireTime) => {
  return jwt.sign(body, process.env.JWT_SECRET, { expiresIn: expireTime })
}
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports={createToken,verifyToken}