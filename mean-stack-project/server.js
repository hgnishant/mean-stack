const http = require('http'); //that's how u import a package in node. this will not ne found in package.json.
//this package is installed along with the installation of node.
//now u will create a server as below: request,response
const port = process.env.PORT || 3000;
const app = require('./backend/app');
app.set('port',port); //set port for express app to run
// const server = http.createServer((req,res)=>{
// res.end('test server');//it ends writing to response stream
// })

const server = http.createServer(app); //this means all the incoming reuqests will be passed onto express app
server.listen(port);//default port is 3000. if not given then use 3000