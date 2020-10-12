// const express = require('express');
// const { ppid } = require('process');

// const app = express();//execute and it will return express app.
// // it's just a chain of middleware
// app.use((req,res,next)=>{
//     console.log('First middleware');
//     next();//allows the request to pass to next middlewares in file
//     //if u dont use next() and don't send a response as well, it will get stuck here till timeout.
// });//to use the middleware function

// app.use((req,res,next)=>{
//     res.send('Hello from express');
//     //not using next() will stop the chain here
// });

// //to export this app use below syntax:
// module.exports = app;//export the entire app with all middlewares
//above code is commented out as that was for initial learning only.

const express = require("express");
const app = express();

//add a middleware to set headers for CORS:
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");//* means for all
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");//allow the header types u need
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,PATCH,DELETE,POST");
    next();//now pass on to next middleware
});

//first param is the default route for us. we can pass as many arguments as required but last has to be (req,res,next) only
app.use("/api/posts", (req, res, next) => {
 const posts = [
    {
      id: "fdywbedi",
      title: "Server Post 1",
      content: "Server side post 1",
    },
    {
      id: "vnjvnejk",
      title: "Server Post 2",
      content: "Server side post 2",
    },
  ];
  //res.json(posts); u can send this or more complcated structures as shown below:
  //return statment is not required as this being the last response, will be sent to the server
  res.status(200).json({
      message:'posts fetched successfully',
      posts:posts
  });
});
module.exports = app;
