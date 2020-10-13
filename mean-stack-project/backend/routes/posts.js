//routing functionality of express
const express = require("express");

const Post = require("../models/post");

const router = express.Router();





  
  //router.post("/api/posts", (req, res, next) => { //note that url will be removed and a filter will be used in app.js so that request
  // with only route "/api/posts" are redirected here
    router.post("", (req, res, next) => {
    // const post = req.body; //body added by bodyParser
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    console.log(post);
    post.save().then((postCreated) => {
      res.status(201).json({
        message: "Post added successfully.",
        postID: postCreated._id,
      });
    }); //save method provided by mongoose on it's model will automatically create a collection with name "posts"
  });
  
  //first param is the default route for us. we can pass as many arguments as required but last has to be (req,res,next) only
  router.get("", (req, res, next) => {
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
    console.log('get req receivved');
    Post.find().then((documents) => {
      console.log(documents);
      res.status(200).json({
        message: "posts fetched successfully",
        posts: documents,
      });
    });
  });
  
  router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    });
  });
  
  //to update use put or patch
  router.put("/:id", (req, res, next) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  });
  
  router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then((res) => {
      console.log("data deleted from DB");
    });
    res.status(200).json({
      message: "post deleted successfully in mongoDB",
    });
  });
  

  module.exports = router;