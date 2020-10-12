// const http = require('http'); //that's how u import a package in node. this will not ne found in package.json.
// //this package is installed along with the installation of node.
// //now u will create a server as below: request,response
// const port = process.env.PORT || 3000;
// const app = require('./backend/app');
// app.set('port',port); //set port for express app to run
// // const server = http.createServer((req,res)=>{
// // res.end('test server');//it ends writing to response stream
// // })

// const server = http.createServer(app); //this means all the incoming reuqests will be passed onto express app
// server.listen(port);//default port is 3000. if not given then use 3000

//new and improved code below:
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
