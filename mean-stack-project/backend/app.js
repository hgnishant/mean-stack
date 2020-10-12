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

const Post = require("./models/post");
const mongoose = require("mongoose");

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
    "GET,PUT,POST,PATCH,DELETE,POST"
  );
  next(); //now pass on to next middleware
});

app.post("/api/posts", (req, res, next) => {
  // const post = req.body; //body added by bodyParser
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save().then(postCreated=>{
    res.status(201).json({
        message: "Post added successfully.",
        postID : postCreated._id
      });
  });//save method provided by mongoose on it's model will automatically create a collection with name "posts"
 
});

//first param is the default route for us. we can pass as many arguments as required but last has to be (req,res,next) only
app.get("/api/posts", (req, res, next) => {
//   const posts = [
//     {
//       id: "fdywbedi",
//       title: "Server Post 1",
//       content: "Server side post 1",
//     },
//     {
//       id: "vnjvnejk",
//       title: "Server Post 2",
//       content: "Server side post 2",
//     },
//   ];
  //res.json(posts); u can send this or more complcated structures as shown below:
  //return statment is not required as this being the last response, will be sent to the server
  Post.find().then(documents=>{
      console.log(documents);
      res.status(200).json({
        message: "posts fetched successfully",
        posts: documents,
      });
  });
 
});

app.delete("/api/posts/:id",(req,res,next)=>{
    Post.deleteOne({_id:req.params.id}).then(res=>{
        console.log('data deleted from DB');
    });
    res.status(200).json({
        message:'post deleted successfully in mongoDB'
    });
});


module.exports = app;
