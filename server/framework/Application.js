const http = require('http');
const Emmiter = require('events');
const urlPathnameFunc = require('./urlPathnameFunc');

module.exports = class Application {
  constructor() {
    this.emitter = new Emmiter;
    this.server = this._createServer();
    this.middlewares = []
  }
  _createMask(path, method) { return `[${path}]:[${method}]` }

  use(...middleware) {
    this.middlewares.push(...middleware)
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path]
      Object.keys(endpoint).forEach(method => {
        const handler = endpoint[method]
        this.emitter.on(this._createMask(path, method), (req, res) => {
          // this.middlewares.forEach(middleware=>{middleware(req,res)})
          // handler(req,res)
          this.runMiddleWares(req,res,this.middlewares,handler)
        })
      })
    });
  }
  runMiddleWares(req, res, middlewares,handler) {
    let i = 0
    function next() {
      if (i<middlewares.length) {
        const currentMiddleware=middlewares[i]
        i++;
        currentMiddleware(req,res,next);
      } else {
        handler(req,res)
      }
    }
    next()
  }
  _createServer() {
    return http.createServer((req, res) => {
      if (["http://localhost:3000", "https://stas.sekond.pl"].includes(req.headers.origin)) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
      }
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");

      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end()
        return;
      }
      
      urlPathnameFunc(req)
      const emitted = this.emitter.emit(this._createMask(req.path, req.method), req, res);
      if (!emitted) {
        res.end("there is no data")
      }
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback)
  }
}