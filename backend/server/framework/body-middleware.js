module.exports = (req, res, next) => {
  let sms = '';
  req.on("data", data => {
    sms += data.toString();
  })
  req.on("end", () => {
    // req.body = sms
    req.body =sms? JSON.parse(sms) : {}
    next()
  })
}
// req.body= () => {
//   let sms = '';
//   req.on("data", data => {
//     sms += data.toString();
//     console.log(sms)
//   })
//   req.on("end", () => {
//     console.log(sms)
//     return sms
//   })
// }

