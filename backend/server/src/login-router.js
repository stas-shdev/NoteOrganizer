const Router = require("../framework/Router")
const router = new Router()
const db = require('../db.js')
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const {createToken, verifyToken} = require('../utilities/jwtToken.js')
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
const createCookie = (res, key, value, MaxAge) => {
  res.setHeader('Set-Cookie', `${key}=${value}; HttpOnly; Max-Age=${MaxAge}; Path=/;`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
}
const login = (givenUsername, givenPassword) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT password, id FROM logins WHERE logins.username = ?;", [givenUsername], async (err, row) => {
      if (err) {
        reject({ succes: false, message: err })
      } else if (row && await argon2.verify(row.password, givenPassword.trim())) {
        resolve({ succes: true, userId: row.id })
      } else {
        reject({ succes: false, message: "Incorrect username or password" })
      }
    })
  })
}
router.post("/login", async (req, res) => {
  try {
    const loginResult = await login(req.body.username, req.body.password)
    console.log(loginResult)
    createCookie(res, "login", createToken({ userId: loginResult.userId, type: "refresh" }, "1h"), "3600")
    res.send({ succes: loginResult.succes, message: "the user is logged in successfully" })
  } catch (err) {
    res.send(err)
  }

})
router.post("/createAccount", async (req, res) => {
  const username = req.body.username
  try {
    if (checkIsNameValid(username) && !await checkIsNameTaken(username)) {
      const password = await argon2.hash(req.body.password.trim(),12)
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
    res.status = 404
    res.send(err)
  }

})

module.exports = router