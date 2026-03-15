const fs = require('fs');
const Application = require('./framework/Application.js');
const bodyMiddleware = require('./framework/body-middleware.js')
const PORT = process.env.PORT || 5000;
const postsRouter=require("./src/posts-router.js")
const groupsRouter=require("./src/groups-router.js");
const testMiddleware = require('./framework/test-middleware.js');
const loginRouter = require('./src/login-router.js');
const cookieMiddleware = require('./framework/cookie-middleware.js');
const sendMiddleware = require('./framework/send-middleware.js');
const authMiddleware = require('./framework/auth-middleware.js');
const inviterouter = require('./src/invite-router.js')
const usersGroupsRouter = require('./src/usersGroups-router.js')
const app = new Application()

app.use(bodyMiddleware)
app.use(sendMiddleware)
app.useFor(["POST"],"/refresh",cookieMiddleware)
app.useFor(["GET","POST","PUT","DELETE"],"/posts",authMiddleware)
app.useFor(["GET","POST","PUT","DELETE"],"/group",authMiddleware)
app.useFor(["GET","POST","PUT","DELETE"],"/createInviteLink",authMiddleware)
app.useFor(["GET","POST","PUT","DELETE"],"/joingroup",authMiddleware)
app.useFor(["GET","POST","PUT","DELETE"],"/usersGroups",authMiddleware)
app.addRouter(postsRouter)
app.addRouter(groupsRouter)
app.addRouter(loginRouter)
app.addRouter(inviterouter)
app.addRouter(usersGroupsRouter)
app.listen(5000, () => {
  console.log(`server started, http://localhost:${PORT}`)
})
