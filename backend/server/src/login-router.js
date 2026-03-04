const Router = require("../framework/Router")
const router = new Router()
const db = require('../db.js')
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const argon2=require('argon2')
require('dotenv').config()

const checkIsNameValid = (username) => {
  if (username === "") {
    return false
  } else {
    return true
  }
}
const checkIsNameTaken = (username) => {
  return new Promise((res, rej) => {
    db.get("SELECT username from logins WHERE username = ?;", [username], (err, row) => {
      if (err) { rej(err) } else {
        if (!row) {
          res(false)
        } else {
          res(true)
        }
      }
    })
  })
}
const writeUserDB = (username, password) => {
  return new Promise((res, rej) => {
    db.run("INSERT INTO logins (id,username,password) VALUES (?,?,?)", [crypto.randomUUID(), username, password], (err) => {
      if (err) { rej(err) } else { res(`Account ${username} was created`) }
    })
  })
}
const createToken = (body, expireTime) => {
  return jwt.sign(body, process.env.JWT_SECRET, { expiresIn: expireTime })
}
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
router.post("/login", (req, res) => {
  db.get("SELECT password, id FROM logins WHERE logins.username = ?;", [req.body.username],async (err, row) => {
    if (argon2.verify(row.password, req.body.password)) {
      res.setHeader('Set-Cookie', `login=${createToken({ userId: row.id, type: "refresh" }, '1h')}; HttpOnly; Max-Age=86400; Path=/; SameSite=None; Secure`);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.send({ succes: true })
      console.log(await argon2.hash(req.body.password,12))
    } else {
      res.send({ succes: false })
      console.log(await argon2.hash(req.body.password,12))
    }
  })
})
router.post("/createAccount", async (req, res) => {
  const username = req.body.username
  const password = await argon2.hash(req.body.password,12)
  console.log(password)
  try {
    if (checkIsNameValid(username) && !await checkIsNameTaken(username)) {
      const result = await writeUserDB(username, password)
      res.send({ status: "succes", message: result })
    }
  } catch (err) { res.send({ status: "error", message: err.message }) }

})
router.post("/checkName", async (req, res) => {
  const username = req.body.checkedUsername
  try {
    if (!checkIsNameValid(username)) {
      res.send({ isUsable: false, message: "This username is not Valid" })
    } else if (await checkIsNameTaken(username)) {
      res.send({ isUsable: false, message: "This nick is already taken" })
    } else {
      res.send({ isUsable: true, message: "You can use this username!" })
    }
  } catch (err) { res.send({ isUsable: false, message: err.message }) }
})
router.post("/refresh", (req, res) => {
  try {
    const refreshTokenData = verifyToken(req.cookie.login)
    if (refreshTokenData.type === "refresh") {
      res.send(jwt.sign(
        { userId: refreshTokenData.userId, type: "access" },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
      ))
    } else {
      console.log("try to use access as refresh")
    }
  } catch (err) {
    res.status=404
    res.send(err)
  }
  
})

module.exports = router