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
const bodyParser = require("body-parser"); //required to prase the request body


const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");

const app = express();

//the below connect method will return a promise
mongoose
  .connect(
    "mongodb+srv://nishant:DJupm126SciH6K4a@cluster0.fxgxs.mongodb.net/MEANDemo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("database conenction failed");
  });

  
app.use(bodyParser.json()); //this will parse the request body
app.use(bodyParser.urlencoded({ extended: false })); //only for demo
  //add a middleware to set headers for CORS:
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //* means for all
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  ); //allow the header types u need
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  next(); //now pass on to next middleware
});

  //posts are filtered going to postsRoutes
app.use("/api/posts",postsRoutes);


module.exports = app;
