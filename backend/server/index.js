const fs = require('fs');
const Application = require('./framework/Application.js');
const bodyMiddleware = require('./framework/body-middleware.js')
const PORT = process.env.PORT || 5000;
const postsRouter=require("./src/posts-router.js")
const groupsRouter=require("./src/groups-router.js");
const testMiddleware = require('./framework/test-middleware.js');

const app = new Application()

app.use(bodyMiddleware)
app.useFor(["GET"],"/posts", testMiddleware)
app.addRouter(postsRouter)
app.addRouter(groupsRouter)
app.listen(5000, () => {
  console.log(`server started, http://localhost:${PORT}`)
})
